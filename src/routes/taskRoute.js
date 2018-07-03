const express = require('express');
const taskController = require('../controllers/taskController');

const taskRouter = express.Router();

// // Retrieve all Tasks
taskRouter.get('/', taskController.findAll);

// // Create a new Task
taskRouter.post('/', taskController.create);

// // Retrieve a single Task with noteId
taskRouter.get('/:id', taskController.findOne);

// // Update a Task with noteId
taskRouter.put('/:id', taskController.update);

// // Delete a Task with noteId
taskRouter.delete('/:id', taskController.delete);

module.exports = taskRouter;
