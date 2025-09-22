import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form className="w-full max-w-sm p-8 bg-white rounded shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Criar conta</h1>
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" placeholder="Seu nome" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Seu email" required />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="Sua senha" required />
        </div>
        <Button type="submit" className="w-full">
          Cadastrar
        </Button>
        <div className="text-sm text-center">
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Já tem conta? Entrar
          </Link>
        </div>
      </form>
    </div>
  );
}
