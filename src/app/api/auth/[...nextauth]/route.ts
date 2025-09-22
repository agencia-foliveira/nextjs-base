import { HttpStatusCode } from 'axios';
import { jwtDecode } from 'jwt-decode';
import type { AuthOptions, User } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface UserWithToken extends User {
  token: string;
}

const handleLoginFromApi = async (email?: string, password?: string) => {
  const body = { email, password };
  const mainUrl = `${process.env.NEXT_SERVER_API_URL}/auth/login`;

  try {
    const response = await fetch(mainUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(
        errorData.message || errorData.description || 'Error on requesting login from API'
      );
      (error as any).status = response.status || HttpStatusCode.InternalServerError;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error('[AUTH] Error in authorize:', error);
    throw error;
  }
};

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const userWithToken = await handleLoginFromApi(credentials?.email, credentials?.password);

          return userWithToken || null;
        } catch (error: any) {
          console.error('[AUTH] Error in authorize:', error);

          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        const userWithToken = user as UserWithToken;
        const userToken = jwtDecode(userWithToken.token) as typeof token.user;

        token.id = userWithToken.id;
        token.token = userWithToken.token;
        token.user = userToken;
      }

      if (trigger === 'update' && session?.info) {
        token.user = { ...token.user, ...session.info };
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.token = token.token as string;
        session.user = token.user;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
