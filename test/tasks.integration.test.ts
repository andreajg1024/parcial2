import request from 'supertest';
import app from '../src/index';
import { prisma } from '../src/servicios/prismaClient';

describe('Tasks API integration', () => {
  let userId: string;

  beforeAll(async () => {
    const user = await prisma.user.create({ data: { name: 'Integration', email: `int${Date.now()}@example.com` } });
    userId = user.id;
  });

  afterAll(async () => {
    await prisma.task.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });
    await prisma.$disconnect();
  });

  test('full flow: create task, list, update, delete', async () => {
    const createRes = await request(app).post('/tasks').send({ title: 'T1', description: 'desc', userId });
    expect(createRes.status).toBe(201);
    const task = createRes.body;

    const listRes = await request(app).get(`/tasks/user/${userId}`);
    expect(listRes.status).toBe(200);
    expect(Array.isArray(listRes.body)).toBe(true);

    const patchRes = await request(app).patch(`/tasks/${task.id}`).send({ isCompleted: true });
    expect(patchRes.status).toBe(200);
    expect(patchRes.body.isCompleted).toBe(true);

    const delRes = await request(app).delete(`/tasks/${task.id}`);
    expect(delRes.status).toBe(204);
  });
});
