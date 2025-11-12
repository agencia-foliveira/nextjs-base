import { type NextRequest, NextResponse } from 'next/server';
import { IntegrationService } from '@/lib/bling/integration-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // console.log('[DEBUG] Bking Callback', searchParams.toString());

    const code = searchParams.get('code');
    const state = searchParams.get('state'); // user ID
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/dashboard/integrations?error=auth_failed&message=${error}`
      );
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/dashboard/integrations?error=invalid_callback`
      );
    }

    // Trocar code por access token
    const tokenResponse = await fetch('https://www.bling.com.br/Api/v3/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.BLING_CLIENT_ID!,
        client_secret: process.env.BLING_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/integrations/bling/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Token exchange failed: ${errorText}`);
    }

    const tokens = await tokenResponse.json();

    // Salvar integração no banco
    await IntegrationService.connectBling(state, tokens);

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/dashboard/integrations?success=bling_connected`
    );
  } catch (error) {
    console.error('Error in Bling callback:', error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/dashboard/integrations?error=connection_failed`
    );
  }
}
