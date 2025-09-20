// seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');


const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/mern_shop';
const email = process.env.INIT_ADMIN_EMAIL || 'admin@example.com';
const password = process.env.INIT_ADMIN_PASS || 'ChangeMe123!';

async function run(){
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }
  const hash = await bcrypt.hash(password, 10);
  const admin = new Admin({ name: 'Initial Admin', email, passwordHash: hash, role: 'superadmin' });
  await admin.save();
  console.log('Created admin:', email, 'password:', password);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
