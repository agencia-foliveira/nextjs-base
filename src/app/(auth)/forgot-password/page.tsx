import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form className="w-full max-w-sm p-8 bg-white rounded shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Recuperar senha</h1>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Seu email" required />
        </div>
        <Button type="submit" className="w-full">
          Enviar link
        </Button>
        <div className="text-sm text-center">
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Voltar para login
          </Link>
        </div>
      </form>
    </div>
  );
}
