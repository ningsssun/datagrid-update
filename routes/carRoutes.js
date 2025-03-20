const express = require('express');
const router = express.Router();
const Car = require('../models/Car');


// Get all cars with pagination
router.get('/', async (req, res) => {
  let { search, column, operator, value } = req.query;

  let query = {};

  // If search is provided
  if (search) {
    query.Model = { $regex: search, $options: 'i' };
  }

  // If filter is provided
  if (column && operator && value !== undefined) {
    switch (operator) {
      case 'contains':
        query[column] = { $regex: value, $options: 'i' };
        break;
      case 'equals':
        query[column] = value;
        break;
      case 'starts_with':
        query[column] = { $regex: `^${value}`, $options: 'i' };
        break;
      case 'ends_with':
        query[column] = { $regex: `${value}$`, $options: 'i' };
        break;
      case 'is_empty':
        query[column] = { $in: [null, ''] };
        break;
      default:
        break;
    }
  }

  try {
    const cars = await Car.find(query);
    const total = cars.length;
    res.json({ data: cars, total });
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ error: err.message });
  }
});

// Search cars by keyword across all text fields
router.get('/search', async (req, res) => {
  let { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  // Trim and remove all spaces
  const normalizedQuery = q.trim().replace(/\s+/g, '');

  try {
    const cars = await Car.find({ $text: { $search: normalizedQuery } });
    res.json({ data: cars });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Filter cars by column-specific criteria
router.get('/filter', async (req, res) => {
  const { column, operator, value } = req.query;

  // For 'is_empty' we don't need a value.
  if (!column || !operator || (operator !== 'is_empty' && (value === undefined || value === null || value === ''))) {
    return res.status(400).json({ error: 'Column, operator, and value are required (except for is_empty)' });
  }

  let query = {};

  switch (operator) {
    case 'contains':
      query = {
        $expr: {
          $regexMatch: {
            input: { $toString: `$${column}` },
            regex: value,
            options: 'i'
          }
        }
      };
      break;

    case 'equals':
      query = {
        $expr: {
          $regexMatch: {
            input: { $trim: { input: { $toString: `$${column}` } } },
            regex: `^${value.trim()}$`,
            options: 'i'
          }
        }
      };
      break;

    case 'starts_with':
      query = {
        $expr: {
          $regexMatch: {
            input: { $toString: `$${column}` },
            regex: `^${value}`,
            options: 'i'
          }
        }
      };
      break;

    case 'ends_with':
      query = {
        $expr: {
          $regexMatch: {
            input: { $trim: { input: { $toString: `$${column}` } } },
            regex: `${value.trim()}$`,
            options: 'i'
          }
        }
      };
      break;

    case 'is_empty':
      // Check for missing, null, or empty string values
      query = {
        $or: [
          { [column]: { $exists: false } },
          { [column]: null },
          { [column]: '' }
        ]
      };
      break;

    default:
      return res.status(400).json({ error: 'Invalid operator' });
  }

  try {
    const cars = await Car.find(query);
    res.json({ data: cars });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get details of a specific car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    console.error('Error fetching car by ID:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a car by ID
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
