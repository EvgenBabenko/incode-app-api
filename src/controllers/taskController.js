const Task = require('../models/Task');

module.exports = {
  // Return all Tasks from the database.
  getAll: (req, res) => {
    Task.find()
      .then(task => res.send(task))
      .catch(err => res.status(500).send({ message: 'Some error occurred while retrieving tasks.' }));
  },

  getAllByUser: (req, res) => {
    Task.aggregate(
      [{ $match: { createdByID: req.params.id } }]
    )
      // Task.find()
      .then(task => res.send(task))
      .catch(err => res.status(500).send({ message: 'Some error occurred while retrieving tasks.' }));
  },

  // Find a single task with a id
  getOne: (req, res) => {
    Task.findById(req.params.id)
      .then((task) => {
        if (!task) return res.status(404).send({ message: `Task not found with id ${req.params.id}` });

        res.send(task);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') return res.status(404).send({ message: `Task not found with id ${req.params.id}` });

        return res.status(500).send({ message: `Error retrieving task with id ${req.params.id}` });
      });
  },

  // Create a new task
  create: (req, res) => {
    if (!req.body.title) return res.status(400).send({ message: 'Task title can not be empty' });

    const task = new Task({
      title: req.body.title,
      createdByID: req.body.createdByID,
      description: req.body.description || '',
      status: 'To do'
    });

    task.save()
      .then(data => res.send(data))
      .catch(err => res.status(500).send({ message: err.message || 'Some error occurred while creating the Task.' }));
  },

  // Update a task
  update: (req, res) => {
    if (!req.body) return res.status(400).send({ message: 'Task content can not be empty' });

    Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((task) => {
        if (!task) return res.status(404).send({ message: `Task not found with id ${req.params.id}` });

        res.send(task);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') return res.status(404).send({ message: `Task not found with id ${req.params.id}` });

        return res.status(500).send({ message: `Error updating task with id ${req.params.id}` });
      });
  },

  // Delete a task
  delete: (req, res) => {
    Task.findByIdAndRemove(req.params.id)
      .then((task) => {
        if (!task) return res.status(404).send({ message: `Task not found with id ${req.params.id}` });

        res.send({ message: 'Task deleted successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') return res.status(404).send({ message: `Task not found with id ${req.params.id}` });

        return res.status(500).send({ message: `Could not delete task with id ${req.params.id}` });
      });
  },
};
