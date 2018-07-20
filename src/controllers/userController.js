const User = require('../models/User');

module.exports = {
  getAll: (req, res) => {
    User.find()
      .then(data => res.send(data))
      .catch(err => res.status(500).send({ message: `Server error: ${err}` }));
  },

  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: { profile: req.body } }, { new: true })
      .then((data) => {
        if (!data) return res.status(404).send({ message: 'User not found!' });

        return res.send({ data, message: 'User updated successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') return res.status(404).send({ message: 'User not found!' });

        return res.status(500).send({ message: 'Internal server error.' });
      });
  },

  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((data) => {
        if (!data) return res.status(404).send({ message: 'User not found!' });

        return res.send({ message: 'User deleted successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') return res.status(404).send({ message: 'User not found!' });

        return res.status(500).send({ message: 'Internal server error.' });
      });
  },
};
