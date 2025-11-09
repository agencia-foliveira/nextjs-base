'use client';
import { Alert, Button, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function BlingConnectBanner() {
  const [showBlingBanner, setShowBlingBanner] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();

  useEffect(() => {
    const hasConectedBling = localStorage.getItem('BLING_CONNECTED');

    if (!hasConectedBling) {
      setShowBlingBanner(true);
    } else {
      setShowBlingBanner(false);
    }
  }, []);

  if (!showBlingBanner) return null;

  return (
    <Alert color="green.9" variant="filled" radius="md" p="lg" mb="xl">
      <Stack
        gap="md"
        align={isMobile ? 'stretch' : 'center'}
        justify="space-between"
        style={{
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Text fw={500} size="lg" c="white">
          Conecte sua conta{' '}
          <Text span fw={700}>
            Bling
          </Text>{' '}
          para sincronizar produtos e pedidos.
        </Text>

        <Button
          variant={isMobile ? 'white' : 'white'}
          color="green.9"
          size={isMobile ? 'md' : 'lg'}
          radius="md"
          fullWidth={isMobile}
          rightSection={<Image src="/img/bling-logo.png" alt="Bling Logo" width={90} height={35} />}
          onClick={() => router.push('/bling')}
          styles={{
            root: {
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            },
          }}
        >
          Conectar
        </Button>
      </Stack>
    </Alert>
  );
}
