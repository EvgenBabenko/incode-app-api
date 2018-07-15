const Task = require('../models/Task');

module.exports = {
  getAll: (req, res) => {
    Task.find()
      .then(data => res.send({ data, message: null }))
      .catch(err => res.status(500).send({ message: `Server error: ${err}` }));
  },

  getOne: (req, res) => {
    Task.findById(req.params.id)
      .then((data) => {
        if (!data) res.status(404).send({ message: 'Task not found!' });

        res.send({ data, message: null });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') res.status(404).send({ message: 'Task not found!' });

        res.status(500).send({ message: 'Internal server error.' });
      });
  },

  createTask: (req, res) => {
    if (!req.body.title) res.status(400).send({ message: 'Task title can not be empty' });

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
    });

    task.save()
      .then(data => res.send({ data, message: 'Task added successfully!' }))
      .catch(err => res.status(500).send({ message: `Server error: ${err}` }));
  },

  updateTask: (req, res) => {
    if (!Object.keys(req.body).length) res.status(400).send({ message: 'Task content can not be empty' });

    Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((data) => {
        if (!data) res.status(404).send({ message: 'Task not found!' });

        res.send({ data, message: 'Task updated successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') res.status(404).send({ message: 'Task not found!' });

        res.status(500).send({ message: 'Error updating task!' });
      });
  },

  deleteTask: (req, res) => {
    Task.findByIdAndRemove(req.params.id)
      .then((data) => {
        if (!data) res.status(404).send({ message: 'Task not found!' });

        res.send({ message: 'Task deleted successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') res.status(404).send({ message: 'Task not found!' });

        res.status(500).send({ message: 'Could not delete task!' });
      });
  },
};
