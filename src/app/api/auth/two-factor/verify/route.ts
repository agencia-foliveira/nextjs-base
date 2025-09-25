import { type NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { verifyToken } from '@/lib/auth';
import { authOptions } from '@/lib/next-auth';
import prisma from '@/lib/prisma';

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

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json({ error: 'User not found or 2FA not set up' }, { status: 404 });
    }

    const isValid = verifyToken(token, user.twoFactorSecret);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Two-factor authentication verified',
    });
  } catch (error) {
    console.error('Error verifying 2FA:', error);
    return NextResponse.json({ error: 'Failed to verify 2FA' }, { status: 500 });
  }
}
