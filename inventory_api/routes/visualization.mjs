import express from 'express';
import { get_parts_made, partsMadePerMinute, fetch_elapsed_time} from './visualization_functions.mjs';

const router = express.Router();

router.get('/visualization', async (req, res) => {
  try {
    const partsMade = await get_parts_made();
    const elapsedMinutes = fetch_elapsed_time(); // You'll need to implement this function

    const partsPerMinute = partsMadePerMinute(partsMade, elapsedMinutes);

    // Create a data point with the current timestamp and parts per minute
    const currentTime = new Date(); // Current time in milliseconds

    // Send the response with the calculated data
    res.json({data: [{ time: currentTime, partsPerMinute }] });
  } catch (error) {
    // Handle any errors and send an appropriate response
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

export default router;