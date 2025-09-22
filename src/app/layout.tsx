import './globals.css';

import Link from 'next/link';
import { Providers } from '@/providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
        <footer className="w-full py-4 text-center text-xs text-gray-400 mt-8">
          <Link href="/privacy-policy" className="text-blue-600 hover:underline">
            Política de Privacidade
          </Link>
        </footer>
      </body>
    </html>
  );
}
