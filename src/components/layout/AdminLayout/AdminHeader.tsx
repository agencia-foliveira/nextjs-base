'use client';
import { Box, Container, Group, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { UserDropdown } from '@/components/commons/UserDropdown';

export function AdminHeader() {
  return (
    <Container size="xl" h="100%">
      <Group justify="space-between" h="100%">
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <Group gap="xs">
            <Image src="/img/logo.png" alt="Nexus OS" width={40} height={40} />
            <Box>
              <Text fw={700} c="#000000">
                Nexus OS
              </Text>
            </Box>
          </Group>
        </Link>
        <UserDropdown />
      </Group>
    </Container>
  );
}
