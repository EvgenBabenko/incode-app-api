const Task = require('../models/Task');

module.exports = {
  findAll: (req, res, next) => {
    Task.find()
      .then(tasks => {
        console.log("tasks", tasks);
        res.send(tasks);
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes."
        });
      });
  },

  findOne: (req, res, next) => {
    Task.findById(req.params.id, function (err, task) {
      if (err) return next(err);
      res.send(task);
    })
  },

  create: (req, res, next) => {
    let task = new Task(
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
      }
    );
    task.save(function (err) {
      if (err) {
        return next(err);
      }
      res.send('Task Created successfully')
    })
  },

  delete: (req, res, next) => {
    Task.findByIdAndRemove(req.params.id, function (err) {
      if (err) return next(err);
      res.send('Deleted successfully!');
    })
  }

}
