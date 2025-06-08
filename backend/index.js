const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');

const app = express();

const allowedOrigins = [
  "https://datagrid-update.onrender.com",
  "http://localhost:3000"
];

// Middleware
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use('/api/cars', carRoutes);

// Serve the React static files
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });
