'use client';
import { AppShell, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '@/features/auth/context/AuthContext';
import { AdminHeader } from './AdminHeader';
import { AdminLayoutSkeleton } from './AdminLayout.skeleton';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [opened] = useDisclosure();
  const { status } = useAuth();

  if (status === 'loading') return <AdminLayoutSkeleton />;

  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header style={{ background: '#FFFFFF', borderBottom: '1px solid #e0e0e0' }}>
        <AdminHeader />
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xl">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
