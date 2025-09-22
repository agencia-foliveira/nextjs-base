// export interface JWTUser {
//   sub: string;
//   name: string;
//   email: string;
//   role: string;
//   exp: number;
//   iss: string;
//   aud: string;
// }

import type { User } from '@/lib/auth';

declare module 'next-auth' {
  interface Session {
    user: JWTUser;
    token?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
    token?: string;
    error?: string;
  }
}
