const express = require('express');
const cors = require('cors');
const hydrationRouter = require('./routes/hydration.cjs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// if the url endpoint starts with '/api/hydration', direct it to the hydrationRouter
app.use('/api/hydration', hydrationRouter);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});