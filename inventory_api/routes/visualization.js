// myRoute.js
const express = require('express');
const router = express.Router();

router.get('/visualization', (req, res) => {
  res.send('Hello from the route file!');
});

module.exports = router;