'use client';

import { MantineProvider } from '@mantine/core';
import { AuthProvider } from '@/features/auth/context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      <AuthProvider>{children}</AuthProvider>
    </MantineProvider>
  );
}
