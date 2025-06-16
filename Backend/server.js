const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

const servicesRouter = require('./routes/services');
const authRouter = require('./routes/auth');
const bookingsRouter = require('./routes/bookings');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/services', servicesRouter);
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingsRouter);

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
