const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bedNumber: Number,
  admitted: Boolean,
});

module.exports = mongoose.model('Patient', patientSchema);
