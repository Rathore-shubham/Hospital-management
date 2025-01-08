require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS
const mongoose = require('mongoose');
const patientRoutes = require('./api/patients'); // Import your existing patients routes

const app = express();

// Enable CORS and parse incoming JSON data
const corsOptions = {
    origin: 'http://localhost:3000', // Allow only this origin
    methods: ['GET', 'POST', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
  };
app.use(cors(corsOptions)); 
app.use(express.json());


// Use the routes from patients.js
app.use('/patients', patientRoutes);

// Set the port for the server
const PORT = process.env.PORT || 5000; // Default to 5000 if not set in environment
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
