'use client';
import {
  Box,
  Button,
  Container,
  List,
  Loader,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type ConnectionState = 'idle' | 'connecting' | 'analyzing' | 'complete';

export function BlingConnect() {
  const [state, setState] = useState<ConnectionState>('idle');
  const [progress, setProgress] = useState(0);

  const handleComplete = () => {
    // Redirect to dashboard or perform any final actions
    // console.log('Connection and analysis complete. Redirecting to dashboard...');
  };

  useEffect(() => {
    if (state === 'connecting') {
      const timer = setTimeout(() => {
        setState('analyzing');
        setProgress(50);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (state === 'analyzing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setState('complete');
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }

    if (state === 'complete') {
      const timer = setTimeout(() => {
        handleComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleConnect = () => {
    setState('connecting');
    setProgress(25);
  };

  const getTitle = () => {
    if (state === 'idle') return 'Conectar com Bling';
    if (state === 'connecting') return 'Conectando...';
    if (state === 'analyzing') return 'Analisando produtos...';
    return 'Tudo pronto!';
  };

  const getDescription = () => {
    if (state === 'idle')
      return 'Conecte sua conta Bling via OAuth 2.0 para começar a análise inteligente do seu estoque.';
    if (state === 'connecting') return 'Conectado ao Bling ✅ | Autenticando via OAuth...';
    if (state === 'analyzing')
      return 'Analisando Produtos ⏳ | Importando dados dos últimos 7 dias para gerar valor rápido...';
    return 'Conexão bem-sucedida! Seu dashboard estará pronto em breve. Você será notificado por e-mail.';
  };

  return (
    <Container>
      <Paper
        radius="lg"
        p="xl"
        withBorder
        shadow="md"
        style={{ width: '100%', background: '#FFFFFF' }}
      >
        <Stack gap="lg">
          <Box style={{ textAlign: 'center' }}>
            <Image src="/img/bling-logo.png" alt="Bling Logo" width={180} height={70} />
            <Title order={2} ta="center" style={{ color: '#2E2E2E' }}>
              {getTitle()}
            </Title>
            <Text c="#6E6E6E" size="sm" ta="center" mt="sm">
              {getDescription()}
            </Text>
          </Box>

          {state === 'idle' && (
            <Stack gap="md">
              <Paper p="md" withBorder style={{ backgroundColor: '#F5F5F5' }}>
                <Text size="sm" mb="xs" c="#C7A446">
                  O que você ganhará:
                </Text>
                <List size="sm" spacing="xs" style={{ color: '#6E6E6E' }}>
                  <List.Item>
                    🚨 Alertas de risco de ruptura de estoque (VVD simplificada)
                  </List.Item>
                  <List.Item>💰 Identificação de capital parado e dias sem vender</List.Item>
                  <List.Item>📈 Oportunidades de vendas (produtos em alta)</List.Item>
                  <List.Item>🤖 Gerador de campanhas com IA (GPT-3.5-Turbo)</List.Item>
                </List>
              </Paper>
              <Paper
                p="sm"
                withBorder
                style={{ backgroundColor: 'rgba(199, 164, 70, 0.1)', borderColor: '#C7A446' }}
              >
                <Text size="xs" c="#6E6E6E">
                  🔒 <strong>Conexão segura via OAuth 2.0</strong> - Não pedimos sua chave de API. A
                  autenticação é feita diretamente com o Bling.
                </Text>
              </Paper>
              <Button onClick={handleConnect} fullWidth size="lg" color="green.9">
                Conectar com Bling (OAuth)
              </Button>
            </Stack>
          )}

          {(state === 'connecting' || state === 'analyzing') && (
            <Stack gap="md" align="center">
              <Loader size="xl" type="dots" />
              <Progress value={progress} size="lg" radius="xl" w="100%" animated />
              <Text size="sm" c="dimmed">
                {Math.round(progress)}% completo
              </Text>
            </Stack>
          )}

          {state === 'complete' && (
            <Stack gap="md" align="center">
              <ThemeIcon size={64} radius="xl" color="teal" variant="light">
                <CheckCircle2 size={32} />
              </ThemeIcon>
              <Text size="sm" c="dimmed" ta="center">
                Redirecionando para o dashboard...
              </Text>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
