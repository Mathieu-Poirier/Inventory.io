const express = require('express');
const app = express();
const port = 3000; // You can set your desired port

const visualizationRoute = require('./routes/visualization');

// Define a route
app.use('/', visualizationRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});