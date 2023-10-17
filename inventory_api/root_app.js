const express = require('express');
const app = express();
const port = 3000;

// Define your base URL here (you can change it dynamically)
const baseUrl = '/root';

const visualizationRoute = require('./routes/visualization')(baseUrl);

// Use app.use with baseUrl as a prefix
app.use(baseUrl, visualizationRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});