const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { upload, cloudinary } = require("../config/cloudinary");

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

    // ✅ Add new images (if uploaded → Cloudinary)
    if (req.files && req.files.length > 0) {
      const newImgs = req.files.map((f, idx) => ({
        url: f.path,                // Cloudinary hosted URL
        alt: f.originalname,
        public_id: f.filename,      // Cloudinary public_id (needed for deletion)
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
 * ✅ Remove a single image from product (Cloudinary)
 */
router.delete("/:id/images", async (req, res) => {
  try {
    const { id } = req.params;
    const { url } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // ✅ Find image by URL
    const imageToDelete = product.images.find((img) => img.url === url);
    if (!imageToDelete) {
      return res.status(404).json({ error: "Image not found in product" });
    }

    // ✅ Remove from Cloudinary
    if (imageToDelete.public_id) {
      try {
        await cloudinary.uploader.destroy(imageToDelete.public_id);
        console.log("🟢 Deleted from Cloudinary:", imageToDelete.public_id);
      } catch (err) {
        console.error("❌ Failed to delete from Cloudinary:", err);
      }
    }

    // ✅ Remove from Mongo product.images
    product.images = product.images.filter((img) => img.url !== url);

    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

module.exports = router;
