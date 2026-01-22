/** biome-ignore-all lint/style/noMagicNumbers: <explanation> */
'use client';
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  List,
  Paper,
  rem,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  BarChart3,
  Bot,
  Check,
  CreditCard,
  Database,
  Mail,
  Rocket,
  Shield,
  TestTube,
  Zap,
} from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: Database,
      title: 'Sistema Fullstack',
      description:
        'Backend robusto com Prisma ORM e PostgreSQL para máxima performance e escalabilidade',
      color: 'blue',
    },
    {
      icon: Shield,
      title: 'Autenticação 2FA',
      description:
        'Sistema completo de autenticação com OTP (One-Time Password) para máxima segurança',
      color: 'green',
    },
    {
      icon: Mail,
      title: 'Envio de E-mails',
      description:
        'Integração configurada com Brevo para envio profissional de e-mails transacionais',
      color: 'violet',
    },
    {
      icon: BarChart3,
      title: 'Observabilidade',
      description:
        'Monitoramento completo da aplicação para identificar e resolver problemas rapidamente',
      color: 'orange',
    },
  ];

  const upcomingFeatures = [
    {
      icon: Bot,
      title: 'Desenvolvimento com IA',
      description: 'Pronto para desenvolvimento acelerado utilizando agentes de IA',
      status: 'Pronto',
    },
    {
      icon: TestTube,
      title: 'Testes E2E',
      description: 'Suite completa de testes end-to-end com Playwright',
      status: 'Em breve',
    },
    {
      icon: CreditCard,
      title: 'Sistema de Pagamento',
      description: 'Integração pronta com Stripe para gerenciar assinaturas e pagamentos',
      status: 'Em breve',
    },
    {
      icon: BarChart3,
      title: 'Observabilidade Avançada',
      description: 'Preparado para integração com ferramentas como Sentry e OpenTelemetry',
      status: 'Em breve',
    },
  ];

  const techStack = ['Next.js 16+', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Mantine UI'];

  return (
    <Box style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #172e97 0%, #764ba2 100%)',
          color: 'white',
          paddingTop: rem(40),
          paddingBottom: rem(40),
        }}
      >
        <Container size="lg">
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Badge size="lg" variant="light" color="white">
              Template Pronto para Produção
            </Badge>

            <Title
              order={1}
              size={rem(54)}
              fw={900}
              style={{
                lineHeight: 1.2,
                maxWidth: rem(800),
              }}
            >
              Acelere o desenvolvimento da sua aplicação SaaS
            </Title>

            <Text size="xl" maw={rem(600)} opacity={0.9}>
              Template completo com NextJS 16 e Prisma incluindo autenticação, pagamentos, e-mails e
              muito mais. Comece seu projeto em minutos, não em semanas.
            </Text>

            <Group gap="md">
              <Button
                component="a"
                href="mailto:agencia.foliveira@gmail.com?subject=Projeto%20SaaS%20com%20Next.js"
                size="xl"
                variant="outline"
                color="white"
                leftSection={<Rocket size={20} />}
                style={{ borderWidth: 2 }}
              >
                Agende uma conversa
              </Button>
              <Button
                component="a"
                href="https://github.com/FelipeOliveiraDvP/menu-agora-web"
                target="_blank"
                rel="noopener noreferrer"
                size="xl"
                color="violet"
                variant="filled"
              >
                Ver código-fonte
              </Button>
            </Group>

            <Group gap="xs" mt="md">
              <ThemeIcon size="sm" radius="xl" color="green" variant="light">
                <Check size={14} />
              </ThemeIcon>
              <Text size="sm" opacity={0.9}>
                Sem cobrança
              </Text>
              <Text size="sm" opacity={0.5}>
                •
              </Text>
              <ThemeIcon size="sm" radius="xl" color="green" variant="light">
                <Check size={14} />
              </ThemeIcon>
              <Text size="sm" opacity={0.9}>
                Código fonte completo
              </Text>
              <Text size="sm" opacity={0.5}>
                •
              </Text>
              <ThemeIcon size="sm" radius="xl" color="green" variant="light">
                <Check size={14} />
              </ThemeIcon>
              <Text size="sm" opacity={0.9}>
                Segurança Garantida
              </Text>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container size="lg" py={rem(80)}>
        <Stack gap="xl" align="center" mb={rem(60)}>
          <Badge size="lg" variant="light" color="violet">
            Recursos Inclusos
          </Badge>
          <Title order={2} ta="center" size={rem(42)}>
            Tudo que você precisa para começar
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={rem(600)}>
            Um template completo com as melhores práticas e ferramentas do mercado
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {features.map((feature, index) => (
            <Card
              key={index}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <Stack gap="md">
                <ThemeIcon size={60} radius="md" color={feature.color}>
                  <feature.icon size={32} />
                </ThemeIcon>
                <div>
                  <Title order={3} size="h4" mb="xs">
                    {feature.title}
                  </Title>
                  <Text size="sm" c="dimmed">
                    {feature.description}
                  </Text>
                </div>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Tech Stack Section */}
      <Box style={{ backgroundColor: '#f8f9fa' }} py={rem(80)}>
        <Container size="lg">
          <Stack gap="xl" align="center">
            <Title order={2} ta="center" size={rem(36)} c="violet">
              Stack Tecnológico
            </Title>
            <Text size="lg" c="dimmed" ta="center" maw={rem(600)}>
              Construído com as tecnologias mais modernas e confiáveis do mercado
            </Text>

            <Group gap="md" justify="center">
              {techStack.map((tech, index) => (
                <Badge
                  key={index}
                  size="xl"
                  variant="light"
                  color="violet"
                  style={{ padding: '12px 24px' }}
                >
                  {tech}
                </Badge>
              ))}
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* Upcoming Features Section */}
      <Container size="lg" py={rem(80)}>
        <Stack gap="xl" align="center" mb={rem(60)}>
          <Badge size="lg" variant="light" color="orange">
            Em Desenvolvimento
          </Badge>
          <Title order={2} ta="center" size={rem(42)}>
            Próximas Funcionalidades
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={rem(600)}>
            Recursos adicionais que estão sendo desenvolvidos para tornar seu template ainda mais
            completo
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing="lg">
          {upcomingFeatures.map((feature, index) => (
            <Card
              key={index}
              shadow="sm"
              padding="xl"
              radius="md"
              withBorder
              style={{ position: 'relative', overflow: 'visible' }}
            >
              <Badge
                size="sm"
                variant="filled"
                color="orange"
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 20,
                }}
              >
                {feature.status}
              </Badge>

              <Stack gap="md" mt="xs">
                <ThemeIcon size={50} radius="md" color="orange" variant="light">
                  <feature.icon size={28} />
                </ThemeIcon>
                <div>
                  <Title order={3} size="h4" mb="xs">
                    {feature.title}
                  </Title>
                  <Text size="sm" c="dimmed">
                    {feature.description}
                  </Text>
                </div>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Benefits Section */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #172e97 0%, #764ba2 100%)',
          color: 'white',
        }}
        py={rem(80)}
      >
        <Container size="lg">
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xl">
                <Badge size="lg" variant="light" color="white" c="violet">
                  Benefícios
                </Badge>
                <Title order={2} size={rem(42)}>
                  Por que escolher nosso template?
                </Title>
                <Text size="lg" opacity={0.9}>
                  Economize centenas de horas de desenvolvimento com um template testado e otimizado
                  para produção.
                </Text>

                <List
                  spacing="md"
                  size="lg"
                  icon={
                    <ThemeIcon size={24} radius="xl" color="green">
                      <Check size={16} />
                    </ThemeIcon>
                  }
                >
                  <List.Item>
                    <Text fw={500}>Código limpo e bem documentado</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={500}>Arquitetura escalável e modular</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={500}>Otimizado para SEO e performance</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={500}>Suporte técnico dedicado</Text>
                  </List.Item>
                  <List.Item>
                    <Text fw={500}>Atualizações regulares gratuitas</Text>
                  </List.Item>
                </List>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container size="lg" py={rem(80)}>
        <Paper
          shadow="xl"
          p={rem(60)}
          radius="lg"
          style={{
            background: 'linear-gradient(135deg, #172e97 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Stack gap="xl" align="center">
            <ThemeIcon size={80} radius="xl" color="white" variant="light">
              <Zap size={40} color="#667eea" />
            </ThemeIcon>

            <Title order={2} size={rem(36)}>
              Pronto para começar seu próximo projeto?
            </Title>

            <Text size="lg" maw={rem(600)} opacity={0.9}>
              Entre em contato para adaptar o template à sua operação, publicar em produção e
              planejar os próximos módulos estratégicos para o seu negócio.
            </Text>

            <Group gap="md">
              <Button
                component="a"
                href="mailto:agencia.foliveira@gmail.com?subject=Implanta%C3%A7%C3%A3o%20Template%20Next.js"
                size="xl"
                variant="outline"
                color="white"
                style={{ borderWidth: 2 }}
                leftSection={<Rocket size={20} />}
              >
                Entre em contato
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
