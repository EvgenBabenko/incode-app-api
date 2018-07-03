const Task = require('../models/Task');

module.exports = {
  // Retrieve and return all notes from the database.
  findAll: (req, res) => {
    Task.find()
      .then((task) => {
        console.log('task', task);
        res.send(task);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving notes.'
        });
      });
  },

  // Find a single task with a id
  findOne: (req, res) => {
    Task.findById(req.params.id)
      .then((task) => {
        if (!task) {
          return res.status(404).send({
            message: 'Note not found with id ' + req.params.id
          });
        }
        res.send(task);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: 'Note not found with id ' + req.params.id
          });
        }
        return res.status(500).send({
          message: 'Error retrieving task with id ' + req.params.id
        });
      });
  },

  // Create and Save a new task
  create: (req, res) => {
    // Validate request
    if (!req.body.title) {
      return res.status(400).send({
        message: 'Task title can not be empty'
      });
    }

    // Create a Task
    const task = new Task(
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
      }
    );

    // Save Task in the database
    task.save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the Note.'
        });
      });
  },

  // Update a task identified by the id in the request
  update: (req, res) => {
    // Validate Request
    if (!req.body.title) {
      return res.status(400).send({
        message: 'Note content can not be empty'
      });
    }

    // Find task and update it with the request body
    Task.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
    }, { new: true })
      .then((task) => {
        if (!task) {
          return res.status(404).send({
            message: `Task not found with id ${req.params.id}`
          });
        }
        res.send(task);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.status(404).send({
            message: `Task not found with id ${req.params.id}`
          });
        }
        return res.status(500).send({
          message: `Error updating task with id ${req.params.id}`
        });
      });
  },

  // Delete a task with the specified id in the request
  delete: (req, res) => {
    Task.findByIdAndRemove(req.params.id)
      .then((task) => {
        if (!task) {
          return res.status(404).send({
            message: `Task not found with id ${req.params.id}`
          });
        }
        res.send({ message: 'Note deleted successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: `Task not found with id ${req.params.id}`
          });
        }
        return res.status(500).send({
          message: `Could not delete task with id ${req.params.id}`
        });
      });
  },
};
