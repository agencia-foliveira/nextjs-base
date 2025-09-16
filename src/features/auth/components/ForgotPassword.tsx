'use client';

import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePasswordReset } from '@/features/auth/hooks/usePasswordReset';

export default function ForgotPassword() {
  const { sendResetEmail, loading, error, success } = usePasswordReset();
  const [email, setEmail] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const sent = await sendResetEmail(email);
    if (sent) {
      // Email enviado com sucesso
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Email Enviado!</CardTitle>
            <CardDescription>Enviamos as instruções de recuperação para</CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
                <Mail className="h-4 w-4" />
                {email}
              </div>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.</p>
              <p>O link expira em 10 minutos.</p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
              Enviar novamente
            </Button>

            <Link
              href="/sign-in"
              className="flex items-center justify-center text-sm text-primary hover:underline"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar ao login
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Esqueci minha senha</CardTitle>
          <CardDescription className="text-center">
            Digite seu email para receber as instruções de recuperação
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading || !email}>
              {loading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Enviar instruções
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <div className="flex items-center justify-between w-full text-sm">
            <Link href="/sign-in" className="flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar ao login
            </Link>

            <Link href="/sign-up" className="text-primary hover:underline">
              Criar conta
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
