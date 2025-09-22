import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form className="w-full max-w-sm p-8 bg-white rounded shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Entrar</h1>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Seu email" required />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="Sua senha" required />
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
        <div className="flex justify-between text-sm">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Esqueceu a senha?
          </Link>
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Criar conta
          </Link>
        </div>
      </form>
    </div>
  );
}
