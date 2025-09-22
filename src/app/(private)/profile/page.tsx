import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function ProfilePage() {
  // TODO: Integrar com dados reais do usuário via contexto ou API
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-lg p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-2">Meu Perfil</h1>
        <div className="mb-4">
          <p className="text-gray-700">
            Você pode exportar seus dados, excluir sua conta ou revisar seu consentimento de
            privacidade conforme a LGPD.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Button variant="outline" className="w-full" type="button">
            Exportar meus dados
          </Button>
          <Button variant="destructive" className="w-full" type="button">
            Excluir minha conta
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <Checkbox id="acceptedTerms" checked />
          <label htmlFor="acceptedTerms" className="text-sm text-gray-600">
            Consentimento de termos e privacidade aceito
          </label>
        </div>
        <div className="mt-4 text-sm text-center">
          <Link href="/privacy-policy" className="text-blue-600 hover:underline">
            Ver política de privacidade
          </Link>
        </div>
      </Card>
    </main>
  );
}
