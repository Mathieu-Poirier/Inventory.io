const express = require('express');
const router = express.Router();

module.exports = (baseUrl) => {
  // Update the route path with the dynamic base URL
  router.get(`${baseUrl}/visualizations`, (req, res) => {
    res.send('Hello from the route file!');
  });

  return router;
};