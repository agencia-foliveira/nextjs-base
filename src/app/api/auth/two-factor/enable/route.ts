import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { verifyToken } from '@/features/auth/services';

import prisma from '@/lib/prisma';
import { authOptions } from '../../[...nextauth]/authOptions';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || undefined },
    });

    if (!user?.twoFactorSecret) {
      return NextResponse.json({ error: '2FA setup not initiated' }, { status: 400 });
    }

    const isValid = verifyToken(token, user.twoFactorSecret);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    // Enable 2FA for the user
    await prisma.user.update({
      where: { id: user.id },
      data: { isTwoFactorEnabled: true },
    });

    return NextResponse.json({
      success: true,
      message: 'Two-factor authentication enabled',
    });
  } catch (error) {
    console.error('Error verifying 2FA token:', error);
    return NextResponse.json({ error: 'Failed to verify token' }, { status: 500 });
  }
}
