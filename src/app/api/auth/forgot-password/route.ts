import crypto from 'node:crypto';
import { type NextRequest, NextResponse } from 'next/server';
import { type ForgotPasswordRequest, ForgotPasswordSchema } from '@/features/auth/services';
import { PASSWORD_RESET_TOKEN_BYTES, PASSWORD_RESET_TOKEN_EXPIRY } from '@/lib/constants';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ForgotPasswordRequest;
    const parsedBody = ForgotPasswordSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: 'Por favor, verifique os dados enviados.',
          issues: parsedBody.error.issues,
        },
        { status: 400 }
      );
    }

    const { email } = parsedBody.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true, deletedAt: true },
    });

    if (!user || user.deletedAt) {
      return NextResponse.json(
        { error: 'Verifique o e-mail fornecido e tente novamente.' },
        { status: 400 }
      );
    }

    const resetToken = crypto.randomBytes(PASSWORD_RESET_TOKEN_BYTES).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + PASSWORD_RESET_TOKEN_EXPIRY);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    // 5️⃣ (TODO) Envio de e-mail
    // Aqui você chamaria um serviço de e-mail, ex:
    // await sendPasswordResetEmail(user.email, resetToken);

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'FORGOT_PASSWORD',
        resource: 'User',
        metadata: `Token de redefinição gerado para ${user.email}`,
      },
    });

    return NextResponse.json(
      {
        message: 'Em breve você receberá no seu e-mail um link para redefinir sua senha.',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Erro em /api/forgot-password:', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
