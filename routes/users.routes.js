const express = require('express');

// Controllers
const { 
    createUser,
    getAllActiveUsers,  
    updateUser, 
    deleteUser
} = require('../controllers/users.controller');

//Middlewares
const { createUserValidators } = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');

// Define endpoints before activate server listening to requests
const usersRouter = express.Router();

//Endpoints
usersRouter.post('/', createUserValidators, createUser);

usersRouter.get('/', getAllActiveUsers);

usersRouter.patch('/:id', userExists, updateUser);

usersRouter.delete('/:id', userExists, deleteUser);

// module is a nodeJS global object
module.exports = { usersRouter };