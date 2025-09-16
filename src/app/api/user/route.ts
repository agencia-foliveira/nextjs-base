import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar autenticação
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Obter dados do usuário
    const user = await currentUser();

    return NextResponse.json({
      user: {
        id: user?.id,
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        createdAt: user?.createdAt,
      },
    });
  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
