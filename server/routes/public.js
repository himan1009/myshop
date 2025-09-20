// routes/public.js
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/**
 * GET /api/products
 * List all active products (newest first)
 */
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({ active: true }).sort({ createdAt: -1 }).lean();
    console.log("Fetched products count:", products.length); // 👈 debug log
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});


/**
 * GET /api/products/:id
 * Get a single product by ID
 */
router.get("/products/:id", async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(p);
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
