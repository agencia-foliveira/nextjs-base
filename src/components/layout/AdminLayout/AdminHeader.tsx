'use client';
import { Box, Button, Container, Group, Text, ThemeIcon, Title } from '@mantine/core';
import { IconLogout, IconPackage } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { useAuth } from '@/features/auth/context/AuthContext';

export function AdminHeader() {
  const { user, signOut: logout } = useAuth();

  const handleLogout = () => {
    logout();
    signOut({
      callbackUrl: '/sign-in',
    });
  };

  return (
    <Container size="xl" h="100%">
      <Group justify="space-between" h="100%">
        <Group>
          <ThemeIcon size={40} radius="lg" variant="filled" color="gold">
            <IconPackage size={24} />
          </ThemeIcon>
          <Box>
            <Title order={4} style={{ color: '#2E2E2E' }}>
              Nexus OS
            </Title>
            <Text size="sm" c="#6E6E6E">
              Olá, {user?.name}
            </Text>
          </Box>
        </Group>
        <Button
          variant="subtle"
          color="gray"
          leftSection={<IconLogout size={16} />}
          onClick={handleLogout}
        >
          Sair
        </Button>
      </Group>
    </Container>
  );
}
