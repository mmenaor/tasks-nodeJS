const express = require('express');

// Controllers
const { 
    createTask,
    getAllTasks,  
    getTasksByStatus,
    updateTask, 
    deleteTask
} = require('../controllers/tasks.controller');

//Middlewares
const { createTaskValidators } = require('../middlewares/validators.middleware');
const { taskExists } = require('../middlewares/tasks.middleware');

// Define endpoints before activate server listening to requests
const tasksRouter = express.Router();

//Endpoints
tasksRouter.post('/', createTaskValidators, createTask);

tasksRouter.get('/', getAllTasks);

tasksRouter.get('/:status', getTasksByStatus);

tasksRouter.patch('/:id', taskExists, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask);

// module is a nodeJS global object
module.exports = { tasksRouter };