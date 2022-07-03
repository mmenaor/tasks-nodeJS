const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { tasksRouter } = require('./routes/tasks.routes');

//Global error controller
const { globalErrorHandler } = require('./controllers/error.controller');

//Utils
const { AppError } = require('./utils/appError.util');

// Init express app
const app = express();

// Add to the app the json method
app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

//Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
    next(new AppError(`${req.method} ${req.originalUrl} not found in this server`), 404);
});

//Global error controller
app.use(globalErrorHandler);

module.exports = { app };