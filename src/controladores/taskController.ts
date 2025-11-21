import { Router } from 'express';
import { createTask, listTasksByUser, updateTaskStatus, deleteTask } from '../servicios/taskService';

export const taskRouter = Router();

taskRouter.post('/', async (req, res, next) => {
  try {
    const { title, description, userId } = req.body;
    const task = await createTask({ title, description, userId });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

taskRouter.get('/user/:userId', async (req, res, next) => {
  try {
    const tasks = await listTasksByUser(req.params.userId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

taskRouter.patch('/:id', async (req, res, next) => {
  try {
    const { isCompleted } = req.body;
    const task = await updateTaskStatus(req.params.id, !!isCompleted);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

taskRouter.delete('/:id', async (req, res, next) => {
  try {
    await deleteTask(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
