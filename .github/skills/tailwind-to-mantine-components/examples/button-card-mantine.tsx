import { Card, Title, Text, Button, Group } from "@mantine/core";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  onSubscribe: () => void;
}

export function PricingCard({
  title,
  description,
  price,
  onSubscribe,
}: PricingCardProps) {
  return (
    <Card shadow="sm" radius="lg" withBorder p="lg" maw={384}>
      <Title order={3} mb="xs">
        {title}
      </Title>
      <Text size="sm" c="dimmed" mb="md">
        {description}
      </Text>
      <Group gap={4} mb="lg">
        <Text fz={30} fw={700}>
          {price}
        </Text>
        <Text size="sm" c="dimmed">
          /mês
        </Text>
      </Group>
      <Button fullWidth color="blue" onClick={onSubscribe}>
        Assinar agora
      </Button>
    </Card>
  );
}
