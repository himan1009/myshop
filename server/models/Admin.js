// server/models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' }
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
