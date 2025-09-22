'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <section className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-4 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-700">Ocorreu um erro</h2>
        <p className="text-gray-700 text-center">
          Não foi possível concluir a operação de autenticação.
        </p>
        <div className="bg-red-50 border border-red-200 rounded p-3 w-full text-xs text-red-800 mb-2">
          <div className="mt-1 break-words">
            <span className="block">
              <strong>Mensagem:</strong> {error.message}
            </span>
            {error.digest && (
              <span className="block">
                <strong>Digest:</strong> {error.digest}
              </span>
            )}
          </div>
        </div>
        <Button type="button" onClick={() => reset()} className="mt-2 w-full">
          Tentar novamente
        </Button>
      </section>
    </main>
  );
}
