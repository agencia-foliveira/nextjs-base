// components/auth/ResetPassword.tsx
'use client';

import { ArrowLeft, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import { usePasswordReset } from '../hooks/usePasswordReset';

const MIN_PASSWORD_LENGTH = 8;
const TIME_TO_REDIRECT = 3000; // 3 seconds

export default function ResetPassword() {
  const { resetPassword, loading, error } = usePasswordReset();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    code: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Get code from URL if present
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setFormData((prev) => ({ ...prev, code }));
    }
  }, [searchParams]);

  const validatePassword = (password: string) => {
    if (password.length < MIN_PASSWORD_LENGTH) {
      return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres`;
    }
    if (!/(?=.*[a-zA-Z])/.test(password)) {
      return 'A senha deve conter pelo menos uma letra';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'A senha deve conter pelo menos um número';
    }
    return '';
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validações
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setValidationError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError('As senhas não coincidem');
      return;
    }

    if (!formData.code) {
      setValidationError('Código de verificação é obrigatório');
      return;
    }

    const resetSuccess = await resetPassword(formData.code, formData.password);
    if (resetSuccess) {
      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/sign-in?message=password-reset-success');
      }, TIME_TO_REDIRECT);
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
            <CardTitle className="text-2xl font-bold text-green-600">Senha Redefinida!</CardTitle>
            <CardDescription>Sua senha foi alterada com sucesso</CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Você será redirecionado para a página de login em alguns segundos...
            </p>

            <Button onClick={() => router.push('/sign-in')} className="w-full">
              Ir para Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Nova Senha</CardTitle>
          <CardDescription className="text-center">
            Digite o código recebido e sua nova senha
          </CardDescription>
        </CardHeader>

        <CardContent>
          {(error || validationError) && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error || validationError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de Verificação</Label>
              <Input
                id="code"
                type="text"
                placeholder="Digite o código do email"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
                autoComplete="one-time-code"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Mínimo 8 caracteres com letras e números
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                loading || !formData.code || !formData.password || !formData.confirmPassword
              }
            >
              {loading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Redefinir Senha
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <div className="flex items-center justify-between w-full text-sm">
            <Link
              href="/forgot-password"
              className="flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar
            </Link>

            <Link href="/sign-in" className="text-primary hover:underline">
              Fazer login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
