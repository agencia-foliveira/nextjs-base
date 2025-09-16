'use client';

import { CheckCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TIME_TO_REDIRECT = 5000; // 5 seconds

export default function PasswordResetSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, TIME_TO_REDIRECT);

    return () => clearTimeout(timer);
  }, [router]);

  if (message === 'password-reset-success') {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">Login Realizado!</CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Sua senha foi redefinida e você está logado com sucesso.
              </AlertDescription>
            </Alert>

            <p className="text-sm text-muted-foreground">
              Você será redirecionado para o dashboard automaticamente...
            </p>

            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Ir para Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
