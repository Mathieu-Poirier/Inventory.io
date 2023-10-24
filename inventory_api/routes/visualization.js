// imports 
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const ds = require('ds');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const { get } = require('https');

const query = `SELECT parts_made FROM efficiency;`;
const dom = new JSDOM();
const document = dom.window.document;

// Compute elapsed time since shift start

const SHIFT_START = 8 * 60 * 60; // 8:00 a.m. in seconds

function fetch_elapsed_time() {
  let currentDate = new Date();
  let currentTimeInSeconds = currentDate.getHours() * 3600 + currentDate.getMinutes() * 60 + currentDate.getSeconds();

  // If the current time is within the shift, calculate the elapsed time in minutes
  let elapsedMinutes = Math.floor((currentTimeInSeconds - SHIFT_START) / 60);
  return elapsedMinutes;
}

let fetchInterval = 10000;
setInterval(fetch_elapsed_time, fetchInterval);

// Create a PostgreSQL connection pool

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'yo',
  port: 5432, // Default PostgreSQL port
});

async function get_parts_made(){
  let result = await pool.query(query);
  let new_value = result.rows[0]['parts_made'];
  return new_value;
};
setInterval(get_parts_made, fetchInterval);



// Route visualization sends GET request to the database

router.get('/visualization', async (req, res) => {
    

    // TODO: Calculates parts per minute and creates updated graph with d3
});



setInterval(get_parts_made, fetchInterval);

function get_parts_made_per_minute() {
  let realtime_elapsed_time = fetch_elapsed_time();
  let realtime_parts_made = get_parts_made();
  console.log(realtime_elapsed_time);
  console.log(realtime_parts_made);
  let parts_made_per_minute = realtime_elapsed_time / realtime_parts_made;
  console.log(parts_made_per_minute);
}

setInterval(get_parts_made_per_minute, fetchInterval);

module.exports = router;