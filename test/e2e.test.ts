import request from 'supertest';
import app from '../src/index';
import { prisma } from '../src/servicios/prismaClient';

describe('E2E flow', () => {
  test('user -> create task -> complete -> cleanup', async () => {
    const uRes = await request(app).post('/users').send({ name: 'E2E', email: `e2e${Date.now()}@example.com` });
    expect(uRes.status).toBe(201);
    const user = uRes.body;

    const tRes = await request(app).post('/tasks').send({ title: 'E2E Task', description: 'end-to-end', userId: user.id });
    expect(tRes.status).toBe(201);
    const task = tRes.body;

    const patchRes = await request(app).patch(`/tasks/${task.id}`).send({ isCompleted: true });
    expect(patchRes.status).toBe(200);
    expect(patchRes.body.isCompleted).toBe(true);

    await request(app).delete(`/tasks/${task.id}`);
    await prisma.user.delete({ where: { id: user.id } });
  });
});
