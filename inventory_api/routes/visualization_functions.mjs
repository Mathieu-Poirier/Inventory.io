import pkg from 'pg';
const { Pool } = pkg;
const query = 'SELECT parts_made FROM efficiency'

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: 'yo',
  port: 5432, // Default PostgreSQL port
});

const SHIFT_START = 8 * 60 * 60; // 8:00 a.m. in seconds

function fetch_elapsed_time() {
  let currentDate = new Date();
  let currentTimeInSeconds = currentDate.getHours() * 3600 + currentDate.getMinutes() * 60 + currentDate.getSeconds();

  // If the current time is within the shift, calculate the elapsed time in minutes
  let elapsedMinutes = Math.floor((currentTimeInSeconds - SHIFT_START) / 60);
  return elapsedMinutes;
}

function partsMadePerMinute(partsMade, elapsedMinutes) {
  if (elapsedMinutes > 0) {
    return partsMade / elapsedMinutes;
  } else {
    return 0; // Handle the case where no time has elapsed yet
  }
}

async function get_parts_made() {
  try {
    let result = await pool.query(query);
    let new_value = result.rows[0]['parts_made'];
    if (new_value !== undefined) {
      // Parse the value as an integer
      new_value = parseInt(new_value, 10);
      if (!isNaN(new_value)) {
        return new_value;
      } else {
        throw new Error("Value is not a valid integer.");
      }
    } else {
      throw new Error("No 'parts_made' field found in the result.");
    }
  } catch (error) {
    // Handle errors, e.g., log them or throw further.
    throw error;
  }
}

export { get_parts_made, partsMadePerMinute, query, fetch_elapsed_time};