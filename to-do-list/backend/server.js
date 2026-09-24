require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let dbReady = false;

async function connectDB(retries = 5) {
  for (let i = 1; i <= retries; i++) {
    try {
      console.log(`🔌 MongoDB connect attempt ${i}/${retries}...`);
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4, // force IPv4 — fixes many home/ISP DNS issues
      });
      dbReady = true;
      console.log('✅ MongoDB connected');
      return;
    } catch (err) {
      console.error(`❌ Attempt ${i} failed:`, err.message);
      if (i < retries) await new Promise((r) => setTimeout(r, 3000));
    }
  }
  console.error('💥 All MongoDB connection attempts failed. Check Atlas whitelist & network.');
}

connectDB();

// Reject API calls if DB isn't ready
app.use('/api', (req, res, next) => {
  if (!dbReady) {
    return res.status(503).json({ error: 'Database not connected. Check backend logs.' });
  }
  next();
});

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const { task, completed } = req.body;
    const saved = await new Todo({ task, completed }).save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
