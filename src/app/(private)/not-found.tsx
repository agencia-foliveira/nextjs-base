import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivateNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <section className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center gap-4 max-w-md w-full">
        <h2 className="text-4xl font-bold text-blue-700">404</h2>
        <p className="text-lg text-gray-700 text-center">Página não encontrada</p>
        <p className="text-sm text-gray-500 text-center">
          O recurso privado solicitado não foi localizado.
        </p>
        <Button asChild className="mt-4 w-full">
          <Link href="/dashboard">Ir para Dashboard</Link>
        </Button>
      </section>
    </main>
  );
}
