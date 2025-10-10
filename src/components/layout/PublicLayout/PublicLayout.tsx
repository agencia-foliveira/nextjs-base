'use client';
import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { PublicHeader } from '@/components/commons/PublicHeader';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell header={{ height: 60, collapsed: !pinned, offset: false }} padding="md">
      <AppShell.Header p="md">
        <PublicHeader />
      </AppShell.Header>

      <AppShell.Main pt="var(--app-shell-header-height)">{children}</AppShell.Main>

      <AppShell.Footer p="md">Application footer</AppShell.Footer>
    </AppShell>
  );
}
