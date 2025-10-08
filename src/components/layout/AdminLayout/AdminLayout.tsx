'use client';
import { AppShell, Burger, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { signOut } from 'next-auth/react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { AdminLayoutSkeleton } from './AdminLayout.skeleton';

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const { status, user } = useAuth();

  if (status === 'loading') return <AdminLayoutSkeleton />;

  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>
            {user?.name} - {user?.role}
          </div>
          <Button
            variant="outline"
            size="xs"
            color="red"
            onClick={() =>
              signOut({
                callbackUrl: '/sign-in',
              })
            }
          >
            Logout
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
