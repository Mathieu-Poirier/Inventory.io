// routes/sampleRoute.js
const express = require('express');
const router = express.Router();

// Define a route
router.get('/visualization', (req, res) => {
  res.send('This is the visualization route.');
});

module.exports = router;