import express, {Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.route.js';

mongoose.connect(process.env.DATABASE_URL as string)
.then(() => console.log('Connected!'))
.catch((err) => {
  console.error('Connection error:', err);
});

const app:Express = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

app.get('/health', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

export default app;