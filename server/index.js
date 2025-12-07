// server/index.js
require('dotenv').config(); // 1. Reads the MONGO_URI and PORT from your .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // 2. Retrieves the URI value

// --- MIDDLEWARE ---
app.use(cors()); // Allows cross-origin requests (Client to Server communication)
app.use(express.json()); // Allows server to read incoming JSON data

// --- DB CONNECTION ---
// 3. Mongoose uses the URI to establish the connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB successfully connected!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- ROUTES ---
const projectRoutes = require('./routes/projects.route');
app.use('/api/projects', projectRoutes); // All project routes start with /api/projects

// Basic test route
app.get('/', (req, res) => {
    res.send('Swadeshi Project Registry API is Running!');
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});