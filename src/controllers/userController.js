const User = require('../models/User');
const Task = require('../models/Task');

module.exports = {
  // Return all users from the database.
  getAll: (req, res) => {
    User.find()
      .then(user => res.send(user))
      .catch(err => res.status(500).send({ message: 'Some error occurred while retrieving users.' }));
  },

  // Find a single user with a id
  getOne: (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) res.status(404).send({ message: `User not found with id ${req.params.id}` });

        res.send(user);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') res.status(404).send({ message: `User not found with id ${req.params.id}` });

        return res.status(500).send({ message: `Error retrieving user with id ${req.params.id}` });
      });
  },

  // Create a new user
  // create: (req, res) => {
  //   if (!req.email && !req.password) return res.status(400).send({ message: 'User can not be empty' });

  //   const user = new User({
  //     email: req.body.email,
  //     password: req.body.password,
  //     profile: {
  //       avatar: '',
  //       firstName: '',
  //       lastName: '',
  //       dateOfBirth: '',
  //       gender: '',
  //       address: '',
  //       phoneNumber: '',
  //       skills: '',
  //       experience: '',
  //     }
  //   });

  //   user.save()
  //     .then(data => res.send(data))
  //     .catch(err => res.status(500).send({ message: err.message || 'Some error occurred while creating the User.' }));
  // },

  // Update a user
  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: { profile: req.body } }, { new: true })
      .then((user) => {
        if (!user) return res.status(404).send({ message: `User not found with id ${req.params.id}` });

        res.send(user);
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') return res.status(404).send({ message: `User not found with id ${req.params.id}` });

        return res.status(500).send({ message: `Error updating user with id ${req.params.id}` });
      });
  },

  // Delete a user
  delete: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: `User not found with id ${req.params.id}` });

        res.send({ message: 'User deleted successfully!' });
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') return res.status(404).send({ message: `User not found with id ${req.params.id}` });

        return res.status(500).send({ message: `Could not delete user with id ${req.params.id}` });
      });
  },
};
