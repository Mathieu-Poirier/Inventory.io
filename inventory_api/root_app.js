const express = require('express');
const app = express();
const port = 3000; // Set your desired port

// Define your base URL here
const baseUrl = '/root'; // You can change this to your desired base URL


const visualizationRoute = require('./visualization');

app.use('/router', visualizationRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});