import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ONE_DAY_IN_SECONDS, THIRTY_MINUTES_IN_SECONDS } from '@/constants';
import prisma from '@/lib/prisma';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        // 1. Buscar usuário
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        // TODO: Verificar lockout (ex: failedAttempts, lockedUntil)
        // TODO: Verificar se usuário não foi soft-deleted (deletedAt)

        // 2. Verificar senha
        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isValid) {
          // Opcional: registrar SecurityIncident
          await prisma.securityIncident.create({
            data: {
              userId: user.id,
              type: 'FAILED_LOGIN',
              details: `Failed login from IP ${req?.headers?.['x-forwarded-for'] || 'unknown'}`,
            },
          });
          throw new Error('Invalid credentials');
        }

        // TODO: Verificar 2FA (se isTwoFactorEnabled === true)
        // - Se habilitado, exigir código TOTP antes de logar

        // 3. Registrar LoginActivity
        await prisma.loginActivity.create({
          data: {
            userId: user.id,
            ip: (req?.headers?.['x-forwarded-for'] as string) || 'unknown',
            device: req?.headers?.['user-agent'] || 'unknown',
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
