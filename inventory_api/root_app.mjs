import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000; // You can set your desired port

app.use(cors());

import visualizationRoute from './routes/visualization.mjs';
// Define a route
app.use('/', visualizationRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});