'use client';

import { AppShell } from '@mantine/core';

export function PublicLayoutSkeleton() {
  return (
    <AppShell header={{ height: 60, collapsed: false }} padding="md">
      <AppShell.Header p="md">Loading...</AppShell.Header>

      <AppShell.Main pt="var(--app-shell-header-height)">Loading...</AppShell.Main>
    </AppShell>
  );
}
