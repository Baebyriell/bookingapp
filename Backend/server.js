const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

const servicesRouter = require('./routes/services');
const authRouter = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Health check route (Railway needs this)
app.get('/health', (req, res) => {
    res.json({
        message: "Booking System API is running!",
        timestamp: new Date().toISOString()
    });
});

// Test route
app.get('/', (req, res) => {
    res.json({
        message: "West Booking API is running!",
        endpoints: {
            health: "/health",
            services: "/api/services",
            auth: "/api/auth"
        }
    });
});

// Routes
app.use('/api/services', servicesRouter);
app.use('/api/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server - CRITICAL: Bind to 0.0.0.0 for Railway
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});