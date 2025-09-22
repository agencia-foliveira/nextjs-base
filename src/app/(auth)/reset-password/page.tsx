import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form className="w-full max-w-sm p-8 bg-white rounded shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Redefinir senha</h1>
        <div>
          <Label htmlFor="password">Nova senha</Label>
          <Input id="password" type="password" placeholder="Nova senha" required />
        </div>
        <div>
          <Label htmlFor="confirm">Confirmar senha</Label>
          <Input id="confirm" type="password" placeholder="Confirme a senha" required />
        </div>
        <Button type="submit" className="w-full">
          Redefinir
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
