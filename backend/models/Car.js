const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  Brand: { type: String },
  Model: { type: String },
  AccelSec: { type: Number },
  TopSpeed_KmH: { type: Number },
  Range_Km: { type: Number },
  Efficiency_WhKm: { type: Number },
  FastCharge_KmH: { type: String },
  RapidCharge: { type: String },
  PowerTrain: { type: String },
  PlugType: { type: String },
  BodyStyle: { type: String },
  Segment: { type: String },
  Seats: { type: Number },
  PriceEuro: { type: Number },
  Date: { type: Date },
});

CarSchema.index({
  Brand: 'text',
  Model: 'text',
  AccelSec: 'text',
  TopSpeed_KmH: 'text',
  Range_Km: 'text',
  Efficiency_WhKm: 'text',
  FastCharge_KmH: 'text',
  RapidCharge: 'text',
  PowerTrain: 'text',
  PlugType: 'text',
  BodyStyle: 'text',
  Segment: 'text',
  Seats: 'text',
  PriceEuro: 'text'
});

module.exports = mongoose.model('Car', CarSchema);
