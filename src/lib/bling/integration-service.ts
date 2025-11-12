/** biome-ignore-all lint/complexity/noStaticOnlyClass: <explanation> */
import prisma from '@/lib/prisma';

export interface BlingIntegration {
  id: string;
  access_token: string;
  refresh_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  connected_at: Date;
}

export class IntegrationService {
  // Conectar conta Bling
  static async connectBling(
    userId: string,
    tokens: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
      token_type: string;
      scope: string;
    }
  ): Promise<BlingIntegration> {
    const integration = await prisma.blingIntegration.upsert({
      where: { userId },
      create: {
        userId,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        tokenType: tokens.token_type,
        scope: tokens.scope,
        connectedAt: new Date(),
      },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
        tokenType: tokens.token_type,
        scope: tokens.scope,
        connectedAt: new Date(),
      },
    });

    // Registrar auditoria
    await prisma.auditLog.create({
      data: {
        userId,
        action: 'BLING_CONNECTED',
        resource: 'Integration',
      },
    });

    return IntegrationService.mapToBlingIntegration(integration);
  }

  // Desconectar conta Bling
  static async disconnectBling(userId: string): Promise<void> {
    await prisma.blingIntegration.delete({
      where: { userId },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: 'BLING_DISCONNECTED',
        resource: 'Integration',
      },
    });
  }

  // Obter integração Bling do usuário
  static async getBlingIntegration(userId: string): Promise<BlingIntegration | null> {
    const integration = await prisma.blingIntegration.findUnique({
      where: { userId },
    });

    return integration ? IntegrationService.mapToBlingIntegration(integration) : null;
  }

  // Verificar se token é válido
  static async isBlingTokenValid(userId: string): Promise<boolean> {
    const integration = await prisma.blingIntegration.findUnique({
      where: { userId },
    });

    if (!integration) return false;

    // Verifica se o token expira em pelo menos 5 minutos
    return integration.expiresAt > new Date(Date.now() + 5 * 60 * 1000);
  }

  // Atualizar tokens
  static async refreshBlingTokens(
    userId: string,
    newTokens: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
      token_type: string;
      scope: string;
    }
  ): Promise<BlingIntegration> {
    const integration = await prisma.blingIntegration.update({
      where: { userId },
      data: {
        accessToken: newTokens.access_token,
        refreshToken: newTokens.refresh_token,
        expiresAt: new Date(Date.now() + newTokens.expires_in * 1000),
        tokenType: newTokens.token_type,
        scope: newTokens.scope,
      },
    });

    return IntegrationService.mapToBlingIntegration(integration);
  }

  private static mapToBlingIntegration(integration: any): BlingIntegration {
    return {
      id: integration.id,
      access_token: integration.accessToken,
      refresh_token: integration.refreshToken,
      expires_at: Math.floor(integration.expiresAt.getTime() / 1000),
      token_type: integration.tokenType,
      scope: integration.scope,
      connected_at: integration.connectedAt,
    };
  }
}
