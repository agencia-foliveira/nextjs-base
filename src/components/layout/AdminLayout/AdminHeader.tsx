'use client';
import { Container, Group } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { UserDropdown } from '@/components/commons/UserDropdown';

export function AdminHeader() {
  return (
    <Container size="xl" h="100%">
      <Group justify="space-between" h="100%">
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <Image src="/img/logo.png" alt="Nexus OS" width={64} height={64} />
        </Link>
        <Group gap="xs">
          <UserDropdown />
        </Group>
      </Group>
    </Container>
  );
}
