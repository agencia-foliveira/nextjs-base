import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>

          <Card className="bg-gray-50 p-4 rounded-md mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Bem-vindo, {user.firstName || user.emailAddresses[0].emailAddress}!
            </h2>
            <p className="text-gray-600">
              Este é seu painel pessoal. Aqui você pode gerenciar sua conta e acessar
              funcionalidades exclusivas.
            </p>
          </Card>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900">Perfil</h3>
              <p className="text-sm text-blue-700 mt-1">Gerencie suas informações pessoais</p>
            </Card>

            <Card className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-900">Configurações</h3>
              <p className="text-sm text-green-700 mt-1">Ajuste suas preferências</p>
            </Card>

            <Card className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-900">Relatórios</h3>
              <p className="text-sm text-purple-700 mt-1">Visualize seus dados</p>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
