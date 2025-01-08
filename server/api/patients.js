const mongoose = require('mongoose');
const Patient = require('../models/patient');  // Assuming you put the model in a separate file

// Connect to MongoDB (only when required)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const patients = await Patient.find();
      res.status(200).json(patients);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching patients' });
    }
  }

  if (req.method === 'POST') {
    const { name, age, bedNumber } = req.body;
    const occupiedBeds = await Patient.countDocuments({ admitted: true });
    const totalBeds = 10;

    if (occupiedBeds >= totalBeds) {
      return res.status(400).json({ message: 'No beds available' });
    }

    const newPatient = new Patient({ name, age, bedNumber, admitted: true });
    try {
      await newPatient.save();
      res.status(201).json(newPatient);
    } catch (err) {
      res.status(500).json({ error: 'Error adding patient' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await Patient.findByIdAndDelete(id);
      res.status(200).json({ message: 'Patient discharged successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error discharging patient' });
    }
  }
};
