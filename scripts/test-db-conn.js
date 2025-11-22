import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: '.env' });

async function main() {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log('Prisma connected OK');
  } catch (e) {
    console.error('Prisma connection error:', e.message || e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
