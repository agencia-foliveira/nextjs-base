import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { generateQRCode, generateTwoFactorSecret } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { authOptions } from '../../[...nextauth]/authOptions';

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || undefined },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { secret, otpAuthUrl } = generateTwoFactorSecret(user.email);
    const qrCode = await generateQRCode(otpAuthUrl);

    await prisma.user.update({
      where: { id: user.id },
      data: { twoFactorSecret: secret },
    });

    return NextResponse.json({
      success: true,
      qrCode,
    });
  } catch (error) {
    console.error('Error setting up 2FA:', error);
    return NextResponse.json({ error: 'Failed to set up 2FA' }, { status: 500 });
  }
}
