'use client';
import { AspectRatio, Card, Container, Grid, Stack, Text, Title } from '@mantine/core';

const steps = [
  {
    emoji: '🔗',
    title: 'Conecte com o Bling',
    desc: 'Em poucos cliques, sem senha, sem complicação.',
  },
  {
    emoji: '⚡',
    title: 'Análise Automática',
    desc: 'Processamos seus dados e detectamos riscos e oportunidades.',
  },
  {
    emoji: '📊',
    title: 'Alertas Inteligentes',
    desc: 'Você recebe avisos antes do problema acontecer.',
  },
  {
    emoji: '🎯',
    title: 'Tome Ação',
    desc: 'Recomendações práticas para repor, liquidar ou aproveitar momentum.',
  },
];

export function HowItWorksSection() {
  // eslint-disable-next-line no-magic-numbers
  const YOUTUBE_ASPECT_RATIO = 16 / 9;
  // Vídeo definitivo: https://youtu.be/P3vLLNasOeI?si=Zq2GMvlgjs50iUX-
  const toYouTubeEmbed = (): string => 'https://www.youtube.com/embed/P3vLLNasOeI';

  const embedSrc = toYouTubeEmbed();
  return (
    <Container id="como-funciona" size="lg" py="xl">
      <Stack gap="sm" align="center">
        <Title ta="center" maw={840}>
          Como o Nexus OS resolve isso para você (em menos de 2 minutos)
        </Title>
        <Text ta="center" c="dimmed" maw={760}>
          Implantação instantânea e segura — sem senha, sem complicação.
        </Text>

        <Grid mt="md" gutter="md">
          {steps.map((s) => (
            <Grid.Col key={`works-section-step-${s.title}`} span={{ base: 12, sm: 6 }}>
              <Card withBorder radius="md">
                <Title order={4}>
                  {s.emoji} {s.title}
                </Title>
                <Text c="dimmed" mt="xs">
                  {s.desc}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        <Card withBorder radius="md" mt="md" maw={900}>
          <Title order={5}>Demonstração rápida (2 min)</Title>
          <Text c="dimmed" size="sm" mt="xs">
            Vídeo placeholder do YouTube — substitua pela demonstração oficial quando disponível.
          </Text>
          <AspectRatio ratio={YOUTUBE_ASPECT_RATIO} mt="sm">
            <iframe
              src={`${embedSrc}?rel=0`}
              title="Demonstração do Nexus OS"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
                border: 0,
                borderRadius: 'var(--mantine-radius-md)',
              }}
            />
          </AspectRatio>
        </Card>
      </Stack>
    </Container>
  );
}
