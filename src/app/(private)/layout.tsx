import Link from 'next/link';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white shadow-lg flex flex-col gap-4 p-6 border-r">
        <h2 className="text-xl font-bold mb-6 text-blue-700">Área Privada</h2>
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="px-3 py-2 rounded hover:bg-blue-50 text-gray-700 font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="px-3 py-2 rounded hover:bg-blue-50 text-gray-700 font-medium"
          >
            Perfil
          </Link>
        </nav>
        <div className="mt-auto text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Sistema Exemplo
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
