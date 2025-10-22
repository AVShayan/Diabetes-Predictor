/* The main function of our Node server is to handle requests and responses between
   Electron-App and the FastAPI */

// Import all necessary libraries from Node Package Manager
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')  // Important as Node and Electron are on diff URLs
const predictDiabetes = require('./Controllers/predictController');
const pdfReport = require('./Controllers/pdfController');
const PORT = process.env.PORT || 3500;

// Basic Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// We dont render any static files as Frontend is bundled inside Electron app

// Handling Routes
app.post('/predict',predictDiabetes);
app.post('/pdf',pdfReport);

// Establish the Node Server
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));