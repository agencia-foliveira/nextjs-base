export type ProductAlert = {
  id: string;
  type: 'rupture' | 'dead-stock' | 'opportunity';
  productName: string;
  sku: string;
  imageUrl?: string;
  category: string;
  // Risco de Ruptura
  daysRemaining?: number;
  stockAmount?: number;
  vvd?: number; // Velocidade de Vendas Diárias
  replenishmentTime?: number; // Tempo de reposição
  safetyDays?: number; // Dias de segurança
  // Dinheiro Parado
  capitalTied?: number;
  daysSinceLastSale?: number;
  lastSaleDate?: string;
  costPrice?: number;
  sellingPrice?: number;
  // Oportunidades
  salesGrowth?: number;
  vvdLast7Days?: number;
  vvdPrevious7Days?: number;
};

export type CampaignStrategy = 'aggressive-liquidation' | 'strategic-combo' | 'checkout-upsell';

export type CampaignOutput = {
  instagram: string;
  email: string;
  remarketing: string;
};

export type ToneOfVoice =
  | 'urgent-direct'
  | 'friendly-casual'
  | 'professional-technical'
  | 'enthusiastic-emotional';
