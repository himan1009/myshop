// routes/admin.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Admin = require('../models/Admin');
const Product = require('../models/Product');
const adminAuth = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

// multer setup - store in ./uploads with original extension
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const d = path.join(__dirname, '..', 'uploads');
    cb(null, d);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// ---------- ADMIN AUTH ----------
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email & password required' });
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// ---------- ADMIN: PRODUCTS CRUD ----------
router.get('/products', adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// create product (images field, multiple)
router.post('/products', adminAuth, upload.array('images', 4), async (req, res) => {
  try {
    const { name, shortDescription, longDescription, price, discountPercent, stock } = req.body;

    const images = (req.files || []).map((f, idx) => ({
      url: `${req.protocol}://${req.get('host')}/uploads/${f.filename}`,
      alt: f.originalname,
      order: idx
    }));

    const slug = name ? name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') : '';

    const p = new Product({
      name,
      slug,
      shortDescription,
      longDescription,
      price: Number(price) || 0,
      discountPercent: Number(discountPercent) || 0,
      stock: Number(stock) || 0,
      images
    });

    await p.save();
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// update product: accepts images - will append new images (you can change to replace)
router.put('/products/:id', adminAuth, upload.array('images', 4), async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const p = await Product.findById(id);
    if (!p) return res.status(404).json({ message: 'Not found' });

    // update fields
    ['name','shortDescription','longDescription','price','discountPercent','stock','active'].forEach(field => {
      if (body[field] !== undefined) p[field] = body[field];
    });

    // handle uploaded images - append
    if (req.files && req.files.length) {
      const newImages = req.files.map((f, idx) => ({
        url: `${req.protocol}://${req.get('host')}/uploads/${f.filename}`,
        alt: f.originalname,
        order: p.images.length + idx
      }));
      p.images = p.images.concat(newImages).slice(0, 4); // keep max 4
    }

    await p.save();
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// delete product (and delete files if existed)
router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const p = await Product.findById(id);
    if (!p) return res.status(404).json({ message: 'Not found' });

    // delete image files from disk (best-effort)
    p.images.forEach(img => {
      try {
        const url = new URL(img.url);
        const filePath = path.join(__dirname, '..', url.pathname);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (e) { /* ignore */ }
    });

    await p.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
