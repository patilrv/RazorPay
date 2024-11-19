const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const paymentRoutes = require('./routes/paymentRoute');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// OR Advanced Configuration (if needed)
app.use(
    cors({
        origin: 'http://localhost:3000', // Replace with your frontend's URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        credentials: true, // Allow cookies if needed
    })
);

// Database connection
connectDB();

// Routes
app.use('/api/payments', paymentRoutes);

// Start server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
