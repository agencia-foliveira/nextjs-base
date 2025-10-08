'use client';
import { AppShell, Group } from '@mantine/core';

export function AdminLayoutSkeleton() {
  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: true },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          Loading...
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>Loading...</AppShell.Main>
    </AppShell>
  );
}
