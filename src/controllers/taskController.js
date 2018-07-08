const Task = require('../models/Task');

module.exports = {
  getAll: (req, res) => {
    Task.find()
      .then(task => res.send(task))
      .catch(err => res.status(500).send({ message: `Server error: ${err}` }));
  },


  // getAllByUser: (req, res) => {
  //   Task.aggregate(
  //     [{ $match: { createdByID: req.params.id } }],
  //   )
  //     // Task.find()
  //     .then(task => res.send(task))
  //     .catch(err => res.status(500).send({ message: 'Some error occurred while retrieving tasks.' }));
  // },


  getOne: (req, res) => {
    Task.findById(req.params.id)
      .then((task) => {
        if (!task) return res.status(404).send({ message: 'Task not found!' });

        return res.send(task);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') return res.status(404).send({ message: 'Task not found!' });

        return res.status(500).send({ message: 'Internal server error.' });
      });
  },


  createTask: (req, res) => {
    if (!req.body.title) return res.status(400).send({ message: 'Task title can not be empty' });

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
    });

    return task.save()
      .then(data => res.send(data))
      .catch(err => res.status(500).send({ message: `Server error: ${err}` }));
  },


  updateTask: (req, res) => {
    if (!Object.keys(req.body).length) return res.status(400).send({ message: 'Task content can not be empty' });

    return Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((task) => {
        if (!task) return res.status(404).send({ message: 'Task not found!' });

        return res.send(task);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') return res.status(404).send({ message: 'Task not found!' });

        return res.status(500).send({ message: 'Error updating task!' });
      });
  },


  deleteTask: (req, res) => {
    Task.findByIdAndRemove(req.params.id)
      .then((task) => {
        if (!task) return res.status(404).send({ message: 'Task not found!' });

        return res.send({ message: 'Task deleted successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') return res.status(404).send({ message: 'Task not found!' });

        return res.status(500).send({ message: 'Could not delete task!' });
      });
  },
};
