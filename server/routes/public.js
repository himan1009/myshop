// routes/public.js
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/products  - list active products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ active: true }).sort({ createdAt: -1 }).lean();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/products/:id
router.get('/products/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
