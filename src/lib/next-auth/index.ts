import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authenticator } from 'otplib';
import {
  LOCK_OUT_DURATION_MINUTES,
  LOCK_OUT_THRESHOLD,
  ONE_DAY_IN_SECONDS,
  THIRTY_MINUTES_IN_SECONDS,
} from '@/lib/constants';
import prisma from '@/lib/prisma';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/sign-in',
    error: '/sign-in?error=invalid_credentials',
  },

  session: {
    strategy: 'jwt',
    maxAge: ONE_DAY_IN_SECONDS,
    updateAge: THIRTY_MINUTES_IN_SECONDS,
  },

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        code: { label: '2FA Code', type: 'text' },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciais inválidas');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Credenciais inválidas');
        }

        if (user.deletedAt) {
          throw new Error('Conta desativada. Entre em contato com o suporte.');
        }

        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error('Conta bloqueada. Tente novamente mais tarde.');
        }

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isValid) {
          // Atualiza tentativas e bloqueios
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedAttempts: { increment: 1 },
              lockedUntil:
                user.failedAttempts + 1 >= LOCK_OUT_THRESHOLD
                  ? new Date(Date.now() + LOCK_OUT_DURATION_MINUTES)
                  : user.lockedUntil,
            },
          });

          // Registra incidente de segurança
          await prisma.securityIncident.create({
            data: {
              userId: user.id,
              type: 'FAILED_LOGIN',
              details: `Failed login from IP ${req?.headers?.['x-forwarded-for'] || 'unknown'}`,
            },
          });

          throw new Error('Credenciais inválidas');
        }

        // Se o usuário tem 2FA ativo, o código deve estar presente
        if (user.isTwoFactorEnabled) {
          if (!credentials.code) {
            // etapa 1: senha válida, mas falta o segundo fator
            // aqui você não cria sessão ainda
            return { id: user.id, role: UserRole.GUEST, required2FA: true };
          }

          const isCodeValid = authenticator.verify({
            token: credentials.code,
            secret: user.twoFactorSecret!,
          });

          if (!isCodeValid) {
            await prisma.securityIncident.create({
              data: {
                userId: user.id,
                type: 'FAILED_2FA',
                details: `Invalid 2FA token from IP ${req?.headers?.['x-forwarded-for'] || 'unknown'}`,
              },
            });

            throw new Error('Código de verificação inválido');
          }
        }

        // Login bem-sucedido — resetar contadores
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedAttempts: 0,
            lockedUntil: null,
          },
        });

        // Registrar atividade de login
        const ipHeader = req?.headers?.['x-forwarded-for'];
        const ip = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader || 'unknown';

        await prisma.loginActivity.create({
          data: {
            userId: user.id,
            ip,
            device: req?.headers?.['user-agent'] || 'unknown',
            successful: true,
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          required2FA: false,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.avatar = user.avatar;
        token.required2FA = user.required2FA;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          avatar: token.avatar,
        };
        session.required2FA = token.required2FA;
      }
      return session;
    },
  },
};
