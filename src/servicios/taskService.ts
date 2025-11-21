import { prisma } from './prismaClient';

export async function createTask({ title, description, userId }: { title: string; description?: string; userId: string }) {
  return prisma.task.create({ data: { title, description, userId } });
}

export async function listTasksByUser(userId: string) {
  return prisma.task.findMany({ where: { userId } });
}

export async function updateTaskStatus(id: string, isCompleted: boolean) {
  return prisma.task.update({ where: { id }, data: { isCompleted } });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({ where: { id } });
}
