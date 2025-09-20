// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');

// const adminRoutes = require('./routes/admin');              // auth/admin login routes
// const publicRoutes = require('./routes/public');            // public product APIs
// const adminProductsRoutes = require('./routes/adminProducts'); // ✅ product CRUD routes

// const app = express();

// // config
// const PORT = process.env.PORT || 5000;
// const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/mern_shop';

// // ✅ must be before routes
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // middleware
// app.use(cors()); // in prod restrict origin

// // serve uploaded images statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // routes
// app.use('/api', publicRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/admin/products', adminProductsRoutes); // ✅ mount here

// // health
// app.get('/health', (req, res) => res.json({ ok: true }));

// // connect mongo and start
// mongoose.set('strictQuery', true);
// mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(()=> {
//     console.log('Mongo connected');
//     app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
//   })
//   .catch(err => {
//     console.error('Mongo connection error:', err);
//     process.exit(1);
//   });


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminRoutes = require('./routes/admin');              // auth/admin login routes
const publicRoutes = require('./routes/public');            // public product APIs
const adminProductsRoutes = require('./routes/adminProducts'); // product CRUD routes

const app = express();

// config
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/mern_shop';

// must be before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(cors()); // ✅ in prod restrict origin (e.g., only your frontend domain)

// ✅ no need to serve /uploads anymore since Cloudinary hosts images

// routes
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/products', adminProductsRoutes);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

// connect mongo and start
mongoose.set('strictQuery', true);
mongoose
  .connect(MONGO)
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });
