const express = require("express");
const taskController = require('../controllers/taskController');

const taskRouter = express.Router();



// // Retrieve all Notes
taskRouter.get('/', taskController.findAll);

// // Create a new Note
taskRouter.post('/', taskController.create);

// // Retrieve a single Note with noteId
taskRouter.get('/:task', taskController.findOne);

// // Update a Note with noteId
// taskRouter.put('/notes/:noteId', taskController.update);

// // Delete a Note with noteId
// taskRouter.delete('/notes/:noteId', taskController.delete);


// router.get('/test', task_controller.test);
// router.get('/', task_controller.tasks_all);
// router.post('/create', task_controller.task_create);
// router.get('/:id', task_controller.task_details);
// router.put('/:id/update', task_controller.task_update);
// router.delete('/:id/delete', task_controller.task_delete);


module.exports = taskRouter;
