import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

async function main() {
  console.log('Running seed...');
  const u1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { name: 'Alice', email: 'alice@example.com' }
  });

  const u2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: { name: 'Bob', email: 'bob@example.com' }
  });

  await prisma.task.upsert({
    where: { id: 'seed-task-1' },
    update: {},
    create: { id: 'seed-task-1', title: 'Initial Task', description: 'Seeded task', isCompleted: false, userId: u1.id }
  });

  console.log('Seed finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
