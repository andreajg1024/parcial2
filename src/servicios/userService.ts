import { prisma } from './prismaClient';

export async function createUser({ name, email }: { name: string; email: string }) {
  return prisma.user.create({ data: { name, email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id }, include: { tasks: true } });
}
