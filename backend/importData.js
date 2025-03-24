require('dotenv').config();
const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Car = require('./models/Car');

mongoose.set('strictQuery', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
.then(() => {
  console.log('MongoDB Atlas connected');

  // Array to hold all CSV data rows
  const results = [];

  // Read and parse the CSV file
  fs.createReadStream('./ElectricCarData.csv')
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      console.log('CSV file read, now inserting data...');
      try {
        // Perform a bulk insert of all rows
        await Car.insertMany(results);
        console.log('Data successfully inserted.');
      } catch (error) {
        console.error('Error inserting data:', error);
      } finally {
        mongoose.connection.close();
      }
    });
})
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));
