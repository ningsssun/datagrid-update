const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');

const app = express();

const allowedOrigins = [
  "https://car-data-grid-7f88dc4ca6a7.herokuapp.com",
  "http://localhost:3000"
];

// Middleware
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use('/api/cars', carRoutes);

// Serve the React static files
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Catch-all route for React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("MongoDB Connected");

    // Start Server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });
