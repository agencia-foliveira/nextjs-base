import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  LOCK_OUT_DURATION_MINUTES,
  LOCK_OUT_THRESHOLD,
  ONE_DAY_IN_SECONDS,
  THIRTY_MINUTES_IN_SECONDS,
} from '@/constants';
import prisma from '@/lib/prisma';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
        code: { label: '2FA Code', type: 'text', placeholder: '123456' },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        if (user.deletedAt) {
          throw new Error('Account has been deactivated');
        }

        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error('Account is locked. Try again later.');
        }

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isValid) {
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

          await prisma.securityIncident.create({
            data: {
              userId: user.id,
              type: 'FAILED_LOGIN',
              details: `Failed login from IP ${req?.headers?.['x-forwarded-for'] || 'unknown'}`,
            },
          });
          throw new Error('Invalid credentials');
        }

        // 🔐 2FA
        if (user.isTwoFactorEnabled) {
          if (!credentials.code) {
            throw new Error('2FA code required');
          }

          // TODO: Enviar código para o usuário (e-mail, SMS, app autenticador)
          // Exemplo com otplib TOTP:
          // const { authenticator } = require('otplib');
          // const is2FAValid = authenticator.verify({
          //   token: credentials.code,
          //   secret: user.twoFactorSecret!,
          // });

          const is2FAValid = true; // mock até você integrar otplib
          if (!is2FAValid) {
            throw new Error('Invalid 2FA code');
          }
        }

        // 3. Registrar LoginActivity
        await prisma.loginActivity.create({
          data: {
            userId: user.id,
            ip: (req?.headers?.['x-forwarded-for'] as string) || 'unknown',
            device: req?.headers?.['user-agent'] || 'unknown',
            successful: true,
          },
        });

        // 4. Retornar usuário sem senha
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.email, // ou outro campo se existir
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: ONE_DAY_IN_SECONDS,
    updateAge: THIRTY_MINUTES_IN_SECONDS,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    error: '/sign-in?error=invalid_credentials',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
