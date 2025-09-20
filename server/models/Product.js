// models/Product.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: String,
  alt: String,
  order: Number,
  public_id: String, // ✅ store Cloudinary public_id for deletion
}, { _id: false });


const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, index: true },
  shortDescription: String,
  longDescription: String,
  price: { type: Number, default: 0 },
  discountPercent: { type: Number, default: 0 },
  images: [ImageSchema],
  stock: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
