import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {

  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  } catch (e) {
    console.error('migrate deploy error (ignored in test setup):', e);
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
