// routes/sampleRoute.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'yo',
  port: 5432, // Default PostgreSQL port
});




// Define a route
router.get('/visualization', async (req, res) => {
    const result = await pool.query('SELECT parts_made FROM efficiency');
    // Send the query result as a JSON response
    res.json(result.rows);
});

module.exports = router;