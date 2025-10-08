'use client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/features/auth/context/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MantineProvider>
            <Notifications position="top-right" />
            {children}
          </MantineProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
