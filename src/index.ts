import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './controladores/userController';
import { taskRouter } from './controladores/taskController';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.use((err: any, req: any, res: any, _next: any) => {
  // keep `_next` parameter to preserve Express error middleware signature
  void _next;
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal error' });
});

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server listening on ${port}`));
}

export default app;
