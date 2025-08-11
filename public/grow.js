const express = require('express');
const app = express();
app.use(express.json());

let store = [];

app.get('/api', (req, res) => {
  res.json({ ok: true, data: store });
});

app.post('/api', (req, res) => {
  const { name, quantity = 0, lowThreshold = 2 } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ ok: false, error: 'name required' });
  }
  const existing = store.find(i => i.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    existing.quantity = Number(quantity);
    existing.lowThreshold = Number(lowThreshold);
    existing.updatedAt = new Date().toISOString();
  } else {
    store.push({
      id: Date.now().toString(),
      name,
      quantity: Number(quantity),
      lowThreshold: Number(lowThreshold),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  res.json({ ok: true, data: store });
});

app.put('/api', (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ ok: false, error: 'id query required' });
  const item = store.find(i => i.id === id);
  if (!item) return res.status(404).json({ ok: false, error: 'not found' });
  const { name, quantity, lowThreshold } = req.body;
  if (name) item.name = name;
  if (quantity !== undefined) item.quantity = Number(quantity);
  if (lowThreshold !== undefined) item.lowThreshold = Number(lowThreshold);
  item.updatedAt = new Date().toISOString();
  res.json({ ok: true, data: item });
});

app.delete('/api', (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ ok: false, error: 'id query required' });
  const before = store.length;
  store = store.filter(i => i.id !== id);
  res.json({ ok: true, removed: before - store.length });
});

app.use(express.static('public')); // biar bisa serve grow.html

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Grow-a-garden server running on http://localhost:${PORT}`);
});
