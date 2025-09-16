// components/auth/CustomSignUp.tsx
'use client';

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
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClerkForm } from '@/features/auth/hooks/useClerkForm';

export default function CustomSignUp() {
  const { handleSignUp, loading, error, signUp } = useClerkForm();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptTerms: false,
  });

  const [step, setStep] = useState<'signup' | 'verify'>('signup');
  const [verificationCode, setVerificationCode] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      return;
    }

    await handleSignUp(formData.email, formData.password, formData.firstName, formData.lastName);

    // Se precisar de verificação, muda para step de verificação
    if (signUp?.status === 'missing_requirements') {
      setStep('verify');
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signUp?.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result?.status === 'complete') {
        // Usuário criado com sucesso
      }
    } catch (err) {
      console.error('Verification error:', err);
    }
  };

  if (step === 'verify') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Verificar Email</CardTitle>
            <CardDescription className="text-center">
              Enviamos um código para {formData.email}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código de Verificação</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <div id="clerk-captcha"></div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
                Verificar Email
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Criar conta</CardTitle>
          <CardDescription className="text-center">Preencha os dados para começar</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  placeholder="João"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  placeholder="Silva"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Mínimo 8 caracteres com letras e números
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: !!checked })}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Aceito os{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  termos de uso
                </Link>{' '}
                e{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  política de privacidade
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={loading || !formData.acceptTerms}>
              {loading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Criar conta
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Já tem uma conta?{' '}
            <Link href="/sign-in" className="text-primary hover:underline">
              Fazer login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
