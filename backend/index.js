require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');

const PORT = process.env.PORT || 4000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'attachments';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or keys in environment variables.');
  process.exit(1);
}

// Service role client (full access)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

const app = express();
app.use(cors());
app.use(express.json());

/**
 * POSTS CRUD (No Auth)
 */

const upload = multer({ storage: multer.memoryStorage() });

// Get all posts
app.get('/posts', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/attachments', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No attachment file provided' });

  const filePath = `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9_.-]/g, '_')}`;

  const { error: uploadError } = await supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (uploadError) return res.status(500).json({ error: uploadError.message });

  const { data: publicUrlData } = supabase.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .getPublicUrl(filePath);

  if (!publicUrlData || !publicUrlData.publicUrl) {
    return res.status(500).json({ error: 'Unable to create public URL for attachment' });
  }

  res.status(201).json({
    url: publicUrlData.publicUrl,
    path: filePath,
    name: file.originalname,
    type: file.mimetype
  });
});

// Get one post by ID
app.get('/posts/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

// Create post
app.post('/posts', async (req, res) => {
  const { title, content, image_url, attachments } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'title and content required' });
  }

  const insertPayload = { title, content, image_url };
  if (attachments !== undefined) insertPayload.attachments = attachments;

  const { data, error } = await supabase
    .from('posts')
    .insert(insertPayload)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Update post
app.put('/posts/:id', async (req, res) => {
  const { title, content, image_url, attachments } = req.body;
  const updates = { updated_at: new Date().toISOString() };
  if (title) updates.title = title;
  if (content) updates.content = content;
  if (image_url) updates.image_url = image_url;
  if (attachments !== undefined) updates.attachments = attachments;

  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Delete post
app.delete('/posts/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Post deleted', post: data });
});
//causes
// Get all causes
app.get('/causes', async (req, res) => {
  const { data, error } = await supabase
    .from('causes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get one causes by ID
app.get('/causes/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('causes')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

// Create causes
app.post('/causes', async (req, res) => {
  const { title, content, image_url } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'title and content required' });
  }

  const { data, error } = await supabase
    .from('causes')
    .insert({ title, content, image_url })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Update causes
app.put('/causes/:id', async (req, res) => {
  const { title, content, image_url } = req.body;
  const updates = { updated_at: new Date().toISOString() };
  if (title) updates.title = title;
  if (content) updates.content = content;
  if (image_url) updates.image_url = image_url;

  const { data, error } = await supabase
    .from('causes')
    .update(updates)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Delete causes
app.delete('/causes/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('causes')
    .delete()
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'causes deleted', post: data });
});
// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)  // plain text check
    .single();

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful', user: { id: user.id, email: user.email, full_name: user.full_name } });
});

app.post('/register', async (req, res) => {
  const { email, password, full_name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const { data, error } = await supabase
    .from('users')
    .insert({ email, password, full_name })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ message: 'User registered', user: { id: data.id, email: data.email, full_name: data.full_name } });
});
/**
 * GALLERIES CRUD (No Auth)
 */

// Get all galleries
app.get('/galleries', async (req, res) => {
  const { data, error } = await supabase
    .from('galleries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get gallery by ID
app.get('/galleries/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('galleries')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

// Create gallery item
app.post('/galleries', async (req, res) => {
  const { category, image_url } = req.body;
  if (!category || !image_url) {
    return res.status(400).json({ error: 'category and image_url are required' });
  }

  const { data, error } = await supabase
    .from('galleries')
    .insert({ category, image_url })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Update gallery item
app.put('/galleries/:id', async (req, res) => {
  const { category, image_url } = req.body;
  const updates = { };
  if (category) updates.category = category;
  if (image_url) updates.image_url = image_url;
  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from('galleries')
    .update(updates)
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Delete gallery item
app.delete('/galleries/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('galleries')
    .delete()
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Gallery item deleted', gallery: data });
});

// Start server
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));