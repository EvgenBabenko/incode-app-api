const express = require('express');
const taskController = require('../controllers/taskController');

const taskRouter = express.Router();

taskRouter.get('/', taskController.findAll);
taskRouter.post('/', taskController.create);
taskRouter.get('/:id', taskController.findOne);
taskRouter.put('/:id', taskController.update);
taskRouter.delete('/:id', taskController.delete);

module.exports = taskRouter;
