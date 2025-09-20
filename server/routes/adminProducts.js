const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Product = require("../models/Product");

// Multer setup (same as add)
const upload = multer({ dest: "uploads/" });

/**
 * ✅ Update existing product (fields + add new images)
 */
router.put("/:id", upload.array("images", 4), async (req, res) => {
  try {
    const { id } = req.params;
    let {
      name,
      shortDescription,
      longDescription,
      price,
      discountPercent,
      stock,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // ✅ Update fields
    if (name) product.name = name;
    if (shortDescription) product.shortDescription = shortDescription;
    if (longDescription) product.longDescription = longDescription;
    if (price !== undefined) product.price = Number(price);
    if (discountPercent !== undefined)
      product.discountPercent = Number(discountPercent);
    if (stock !== undefined) product.stock = Number(stock);

    // ✅ Add new images (if uploaded)
    if (req.files && req.files.length > 0) {
      const newImgs = req.files.map((f, idx) => ({
        url: `/uploads/${f.filename}`,
        alt: f.originalname,
        order: product.images.length + idx,
      }));
      product.images.push(...newImgs);
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

/**
 * ✅ Remove a single image from product
 */
// routes/adminProducts.js
// routes/adminProducts.js
router.delete("/:id/images", async (req, res) => {
  try {
    const { id } = req.params;
    let { url } = req.body;

    console.log("Incoming URL:", url);

    // strip domain if present
    url = url.replace(/^https?:\/\/[^/]+/, "");
    console.log("Normalized URL:", url);

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // match more loosely
    const imagesToDelete = product.images.filter((img) =>
      img.url.includes(path.basename(url))
    );

    console.log("Images to delete:", imagesToDelete);

    // remove from array
    product.images = product.images.filter(
      (img) => !img.url.includes(path.basename(url))
    );

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
});



module.exports = router;
