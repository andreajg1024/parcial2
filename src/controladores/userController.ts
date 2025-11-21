import { Router } from 'express';
import { createUser, getUserById } from '../servicios/userService';

export const userRouter = Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await createUser({ name, email });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});
