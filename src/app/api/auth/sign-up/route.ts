import bcrypt from 'bcryptjs';
import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, acceptedTerms } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // cria usuário
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        acceptedTerms: acceptedTerms ?? false,
        role: 'USER', // padrão
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // registrar log de auditoria
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'SIGN_UP',
        resource: 'User',
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
