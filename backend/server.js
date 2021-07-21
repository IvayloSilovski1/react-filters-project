require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/courses', require('./routes/courses'));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
