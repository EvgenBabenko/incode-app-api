const User = require('../models/User');

module.exports = {
  getAll: (req, res) => {
    User.find()
      .then(user => res.send(user))
      .catch(err => res.status(500).send({ message: `Server error: ${err}` }));
  },

  getOne: (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found!' });

        return res.send(user);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') return res.status(404).send({ message: 'User not found!' });

        return res.status(500).send({ message: 'Internal server error.' });
      });
  },

  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: { profile: req.body } }, { new: true })
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found!' });

        return res.send(user);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') return res.status(404).send({ message: 'User not found!' });

        return res.status(500).send({ message: 'Internal server error.' });
      });
  },

  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found!' });

        return res.send({ message: 'User deleted successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') return res.status(404).send({ message: 'User not found!' });

        return res.status(500).send({ message: 'Internal server error.' });
      });
  },
};
