import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              My App
            </Link>

            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <div className="flex gap-2">
                <Link href="/">
                  <Button className="cursor-pointer" variant="ghost">
                    Home
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="cursor-pointer" variant="ghost">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button className="cursor-pointer" variant="ghost">
                    Profile
                  </Button>
                </Link>
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Entrar
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8',
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
