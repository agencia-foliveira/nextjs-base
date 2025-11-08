import 'dotenv/config';
import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@email.com',
      hashedPassword: await bcrypt.hash('Asdf@1234', 10),
      role: UserRole.SUPER_ADMIN,
      acceptedTerms: true,
    },
  });

  console.warn('🌱 Seed completed!');
  console.warn('👑 SUPER_ADMIN created:', superAdmin.email);
}

main()
  .catch((e) => {
    console.error('❌ A error occurs on seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
