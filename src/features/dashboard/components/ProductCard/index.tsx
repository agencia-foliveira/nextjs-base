'use client';
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  AlertTriangle,
  Calendar,
  DollarSign,
  Package as PackageIcon,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import type { ProductAlert } from '@/types';

interface ProductCardProps {
  product: ProductAlert;
  onGenerateCampaign: () => void;
}

export function ProductCard({ product, onGenerateCampaign }: ProductCardProps) {
  const getCardStyle = () => {
    switch (product.type) {
      case 'rupture':
        return {
          color: 'red',
          icon: AlertTriangle,
          badge: 'Risco de Ruptura',
        };
      case 'dead-stock':
        return {
          color: 'orange',
          icon: DollarSign,
          badge: 'Dinheiro Parado',
        };
      case 'opportunity':
        return {
          color: 'teal',
          icon: TrendingUp,
          badge: 'Oportunidade',
        };
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const style = getCardStyle();
  const Icon = style.icon;

  return (
    <Card
      padding="lg"
      radius="md"
      withBorder
      shadow="sm"
      style={{ height: '100%', background: '#FFFFFF' }}
    >
      <Stack gap="md" style={{ height: '100%' }}>
        {/* Header */}
        <Box>
          <Group justify="space-between" align="start" mb="md">
            <ThemeIcon size={40} radius="md" color={style.color} variant="light">
              <Icon size={20} />
            </ThemeIcon>
            <Badge color={style.color} variant="light">
              {style.badge}
            </Badge>
          </Group>

          {/* Product Image */}
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.productName}
              height={240}
              radius="md"
              mb="sm"
              fit="cover"
            />
          )}

          <Text lineClamp={2} mb={4} style={{ color: '#2E2E2E' }}>
            {product.productName}
          </Text>
          <Text size="sm" c="#6E6E6E">
            SKU: {product.sku}
          </Text>
          <Text size="xs" c="#6E6E6E">
            Categoria: {product.category}
          </Text>
        </Box>

        {/* Content by Type */}
        <Box style={{ flex: 1 }}>
          {product.type === 'rupture' && (
            <Paper p="md" radius="md" style={{ backgroundColor: 'rgba(250, 82, 82, 0.08)' }}>
              <Text size="sm" mb="xs">
                Este produto tem menos de <strong>{product.daysRemaining} dias</strong> de estoque
                restante.
              </Text>
              <Group gap="xs" mb="xs">
                <PackageIcon size={14} />
                <Text size="xs" c="#6E6E6E">
                  Estoque atual: {product.stockAmount} unidades
                </Text>
              </Group>
              <Text size="xs" c="#6E6E6E" mb="xs">
                VVD (Velocidade de Vendas): {product.vvd?.toFixed(2)} unid./dia
              </Text>
              <Paper
                p="xs"
                radius="sm"
                style={{
                  backgroundColor: 'rgba(250, 82, 82, 0.05)',
                  borderLeft: '3px solid #FA5252',
                }}
              >
                <Text size="xs" c="#6E6E6E" style={{ fontStyle: 'italic' }}>
                  ⚠️ Nota: Este cálculo pode ser impreciso se o produto ficou fora de estoque
                  recentemente. A VVD refinada será implementada na versão 2.0.
                </Text>
              </Paper>
            </Paper>
          )}

          {product.type === 'dead-stock' && (
            <Paper p="md" radius="md" style={{ backgroundColor: 'rgba(253, 126, 20, 0.08)' }}>
              <Text size="sm" mb="xs">
                <strong>
                  R$ {product.capitalTied?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>{' '}
                em estoque sem vendas há <strong>{product.daysSinceLastSale} dias</strong>.
              </Text>
              <Group gap="xs" mb="xs">
                <Calendar size={14} />
                <Text size="xs" c="#6E6E6E">
                  Última venda: {product.lastSaleDate ? formatDate(product.lastSaleDate) : 'N/A'}
                </Text>
              </Group>
              <Group gap="xs" mb="xs">
                <PackageIcon size={14} />
                <Text size="xs" c="#6E6E6E">
                  Estoque atual: {product.stockAmount} unidades
                </Text>
              </Group>
              <Text size="xs" c="#6E6E6E">
                Preço de custo: R$ {product.costPrice?.toFixed(2)} | Preço de venda: R${' '}
                {product.sellingPrice?.toFixed(2)}
              </Text>
            </Paper>
          )}

          {product.type === 'opportunity' && (
            <Paper p="md" radius="md" style={{ backgroundColor: 'rgba(18, 184, 134, 0.08)' }}>
              <Text size="sm" mb="xs">
                Este produto vendeu <strong>{product.salesGrowth}% mais</strong> nos últimos 7 dias
                comparado aos 7 dias anteriores.
              </Text>
              <Text size="xs" c="#6E6E6E" mb="xs">
                VVD últimos 7 dias: {product.vvdLast7Days?.toFixed(1)} unid./dia
              </Text>
              <Text size="xs" c="#6E6E6E">
                VVD 7 dias anteriores: {product.vvdPrevious7Days?.toFixed(1)} unid./dia
              </Text>
              <Text size="xs" c="teal" mt="xs">
                📈 Tendência de alta detectada
              </Text>
            </Paper>
          )}
        </Box>

        {/* CTA Button - Only for dead-stock per requirements */}
        {product.type === 'dead-stock' && (
          <Button
            fullWidth
            color="gold"
            leftSection={<Sparkles size={16} />}
            onClick={onGenerateCampaign}
            style={{
              background: '#C7A446',
            }}
            styles={{
              root: {
                '&:hover': {
                  background: '#A8872A',
                },
              },
            }}
          >
            Gerar Campanha
          </Button>
        )}
      </Stack>
    </Card>
  );
}
