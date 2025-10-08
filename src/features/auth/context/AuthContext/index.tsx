'use client';

import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getPermissions, type PermissionPath, type User } from '@/features/auth/services';

type AuthStatusType = 'authenticated' | 'unauthenticated' | 'loading';

type AuthContextType = {
  status: AuthStatusType;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (permission: PermissionPath) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatusType>('loading');
  const { data: session, status: sessionStatus } = useSession();

  const login = (userData: User) => {
    setUser(userData);
    setStatus('authenticated');
  };

  const logout = () => {
    setUser(null);
    setStatus('unauthenticated');
  };

  const hasPermission = (permission: PermissionPath) => {
    if (!user || status !== 'authenticated') return false;
    const roles = getPermissions(permission);
    return roles.includes(user.role);
  };

  const authState = useMemo(
    () => ({
      status,
      user,
      login,
      logout,
      hasPermission,
    }),
    [status, user]
  );

  useEffect(() => {
    if (session?.user && sessionStatus === 'authenticated') {
      setUser(session.user as User);
      setStatus('authenticated');
    } else if (sessionStatus === 'unauthenticated') {
      setUser(null);
      setStatus('unauthenticated');
    } else {
      setStatus('loading');
    }
  }, [session, sessionStatus]);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};
