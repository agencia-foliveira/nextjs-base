'use client';

import { createContext, useContext, useMemo, useState } from 'react';
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

  const login = (userData: User) => {
    setUser(userData);
    setStatus('authenticated');
  };

  const logout = () => {
    setUser(null);
    setStatus('unauthenticated');
  };

  const hasPermission = (permission: PermissionPath) => {
    if (!user) return false;
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

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};
