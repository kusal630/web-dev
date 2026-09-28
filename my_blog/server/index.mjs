import express from 'express';
import cors from 'cors';
import loadEnvironment from './loadEnvironment.mjs';
import { connectToDatabase } from './db/conn.mjs';
import postsRouter from './routes/posts.mjs';

const env = loadEnvironment();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (_req, res) => {
  res.json({ status: 'Blog API is running' });
});

app.use('/api/posts', postsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

connectToDatabase()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`API listening on http://localhost:${env.port}`);
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err.message);
    process.exit(1);
  });