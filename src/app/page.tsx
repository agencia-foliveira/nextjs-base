import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col items-center justify-center px-4">
      <section className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-2">Next.js Base Template</h1>
          <p className="text-lg text-gray-600">
            Exemplo de landing page para apresentação do template
          </p>
        </header>
        <ul className="space-y-4">
          <li className="flex items-center gap-2">
            <span className="font-semibold text-blue-700">Autenticação:</span>
            <span>Páginas de login, cadastro, recuperação e redefinição de senha</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="font-semibold text-blue-700">Layout modular:</span>
            <span>Estrutura pronta para áreas públicas e privadas</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="font-semibold text-blue-700">Componentes UI:</span>
            <span>Botões, inputs, cards e mais, baseados em Radix UI</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="font-semibold text-blue-700">Pronto para API:</span>
            <span>Estrutura para rotas e integração backend</span>
          </li>
        </ul>
        <div className="flex flex-col gap-2 items-center">
          <Button asChild className="w-full">
            <Link href="/sign-in">Entrar</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/sign-up">Criar conta</Link>
          </Button>
        </div>
        <footer className="text-center text-xs text-gray-400 mt-4">
          &copy; {new Date().getFullYear()} Next.js Base Template. Exemplo fictício.
        </footer>
      </section>
    </main>
  );
}
