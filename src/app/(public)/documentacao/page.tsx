import type { Metadata } from 'next';

import Documentation from '@/components/pages/Documentation';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: 'Manual de Integração + Bling',
  description:
    'Guia de integração segura e prática entre Next Starter e Bling ERP: funcionamento, permissões e recomendações.',
  openGraph: {
    title: `${APP_NAME} — Manual de Integração + Bling`,
    description:
      'Guia de integração segura e prática entre Next Starter e Bling ERP: funcionamento, permissões e recomendações.',
    url: '/manual',
  },
  alternates: { canonical: '/manual' },
} satisfies Metadata;

export default function Page() {
  return <Documentation />;
}
