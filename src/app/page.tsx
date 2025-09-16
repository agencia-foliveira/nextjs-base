'use client';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Bem-vindo ao Sistema
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Sistema de autenticação completo usando Next.js 15 e Clerk
          </p>

          <div className="mt-10">
            <SignedOut>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <SignInButton mode="modal">
                  <Button className="w-full sm:w-auto" variant="default">
                    Entrar
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full sm:w-auto" variant="secondary">
                    Criar Conta
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link href="/dashboard">
                  <Button className="w-full sm:w-auto" variant="default">
                    Ir para Dashboard
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button className="w-full sm:w-auto" variant="secondary">
                    Ver Perfil
                  </Button>
                </Link>
              </div>
            </SignedIn>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl">🔐</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Autenticação Segura</h3>
              <p className="text-gray-500">Login e cadastro seguros com Clerk</p>
            </Card>
            <Card className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">👤</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gerenciamento de Perfil</h3>
              <p className="text-gray-500">Gerencie suas informações pessoais</p>
            </Card>
            <Card className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard Personalizado</h3>
              <p className="text-gray-500">Acesse funcionalidades exclusivas</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
