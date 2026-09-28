import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db/conn.mjs';

const router = Router();
const postsCollection = () => getDb().collection('posts');

function toObjectId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

function buildPostData(body) {
  const data = {};
  if (body.title !== undefined) data.title = String(body.title).trim();
  if (body.author !== undefined) data.author = String(body.author).trim();
  if (body.content !== undefined) data.content = String(body.content);
  return data;
}

// GET /api/posts?archived=true|false
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.archived === 'true') filter.archived = true;
    if (req.query.archived === 'false') filter.archived = false;

    const list = await postsCollection().find(filter).sort({ createdAt: -1 }).toArray();
    res.json(list);
  } catch {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const _id = toObjectId(req.params.id);
    if (!_id) return res.status(400).json({ error: 'Invalid post id' });

    const post = await postsCollection().findOne({ _id });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// POST /api/posts
router.post('/', async (req, res) => {
  try {
    const data = buildPostData(req.body);
    if (!data.title || !data.content) {
      return res.status(400).json({ error: 'title and content are required' });
    }

    const now = new Date();
    const doc = {
      title: data.title,
      author: data.author || 'Anonymous',
      content: data.content,
      archived: false,
      createdAt: now,
      updatedAt: now,
    };

    const result = await postsCollection().insertOne(doc);
    res.status(201).json({ _id: result.insertedId, ...doc });
  } catch {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// PUT /api/posts/:id
router.put('/:id', async (req, res) => {
  try {
    const _id = toObjectId(req.params.id);
    if (!_id) return res.status(400).json({ error: 'Invalid post id' });

    const data = buildPostData(req.body);
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'No updatable fields provided' });
    }
    if (data.title !== undefined && !data.title) {
      return res.status(400).json({ error: 'title cannot be empty' });
    }

    const updated = await postsCollection().findOneAndUpdate(
      { _id },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    if (!updated) return res.status(404).json({ error: 'Post not found' });

    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// PATCH /api/posts/:id/archive  -> toggles archived
router.patch('/:id/archive', async (req, res) => {
  try {
    const _id = toObjectId(req.params.id);
    if (!_id) return res.status(400).json({ error: 'Invalid post id' });

    const current = await postsCollection().findOne({ _id });
    if (!current) return res.status(404).json({ error: 'Post not found' });

    const updated = await postsCollection().findOneAndUpdate(
      { _id },
      { $set: { archived: !current.archived, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to archive post' });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const _id = toObjectId(req.params.id);
    if (!_id) return res.status(400).json({ error: 'Invalid post id' });

    const result = await postsCollection().deleteOne({ _id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ deleted: true, _id: req.params.id });
  } catch {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;