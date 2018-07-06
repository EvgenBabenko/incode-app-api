const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');

const { SECRET_KEY, ADMIN_PASS } = require('../config'); // get config file
const User = require('../models/User');

module.exports = {
  login: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      // if (user.role === 'admin') return res.status(401).send('Invalid credentials.');

      // check if the password is valid
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

      // if user is found and password is valid
      // create a token
      const token = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });

      // return the information including token as JSON
      res.status(200).send({
        auth: true,
        token,
        id: user._id,
        role: user.role,
      });
    });
  },

  // // Find a single task with a id
  // logout: (req, res) => {
  //   res.status(200).send({ auth: false, token: null });
  // },

  registerAdmin: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send('Error on the server.');
      if (user) return res.status(400).send('Duplicate email');
      // if (user.role === 'admin') return res.status(401).send('Invalid credentials.');
      // if (req.body.pass !== ADMIN_PASS) return res.status(401).send('Invalid credentials.');

      const hashedPassword = bcrypt.hashSync(req.body.password, 8);

      User.create({
        email: req.body.email,
        password: hashedPassword,
        role: 'admin'
      }, (err, user) => {
        if (err) return res.status(500).send('There was a problem registering the user`.');

        // if user is registered without errors
        // create a token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token, id: user._id });
      });
    });
  },

  // Create and Save a new task
  register: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send('Error on the server.');
      if (user) return res.status(400).send('Duplicate email');
      // if (user.role === 'admin') return res.status(401).send('Invalid credentials.');
      console.log(user);

      const hashedPassword = bcrypt.hashSync(req.body.password, 8);

      User.create({
        email: req.body.email,
        password: hashedPassword,
        profile: {}
      }, (err, user) => {
        if (err) return res.status(500).send('There was a problem registering the user`.');

        // if user is registered without errors
        // create a token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token, id: user._id, role: user.role });
      });
    });
  },

  // Update a task identified by the id in the request
  me: (req, res, next) => {
    User.findById(req.userId, { password: 0 }, (err, user) => {
      if (err) return res.status(500).send('There was a problem finding the user.');
      if (!user) return res.status(404).send('No user found.');
      res.status(200).send(user);
    });
  },
};
