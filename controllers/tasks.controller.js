//Models
const { Task } = require('../models/task.model');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createTask = catchAsync(async (req, res, next) => {
    const { title, userId, limitDate } = req.body;

    const newTask = await Task.create({ 
        title,
        userId,
        limitDate
    });

    res.status(201).json({
        status: 'success',
        newTask
    });   
});

const getAllTasks = catchAsync(async (req, res, next) => {
    const tasks = await Task.findAll();

    res.status(200).json({
        status: 'success',
        tasks
    });    
});

const getTasksByStatus = catchAsync(async (req, res, next) => {
    const { status } = req.params;
    const statusValues = ['active', 'completed', 'late', 'cancelled'];

    if(statusValues.indexOf(status) === -1){
        return next(new AppError('Incorrect status value', 400));
    }
    
    const tasks = await Task.findAll({ where: { status } });

    res.status(200).json({
        status: 'success',
        tasks
    });    
});

const updateTask = catchAsync(async (req, res, next) => {
    const { task } = req;
    const { finishDate } = req.body;

    const finishDateUser = new Date(finishDate);

    if(finishDateUser.valueOf() > task.limitDate.valueOf()){
        await task.update({ finishDate, status: 'late' });
    } else {
        await task.update({ finishDate, status: 'completed' });
    }

    res.status(204).json({ status: 'success' });
});

const deleteTask = catchAsync(async (req, res, next) => {
    const { task } = req;

    await task.update({ status: 'cancelled'});

    res.status(204).json({ status: 'success' });
});

module.exports = { 
    createTask,
    getAllTasks,  
    getTasksByStatus,
    updateTask, 
    deleteTask
};