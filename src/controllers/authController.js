const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../models/User');

module.exports = {
  logIn: (req, res) => {
    User.findOne({ email: req.body.email }, (err, data) => {
      if (err) return res.status(500).send({ auth: false, message: `Server error: ${err}` });

      if (!data) return res.status(404).send({ auth: false, message: 'Incorrect email or password.' });

      const passwordIsValid = bcrypt.compareSync(req.body.password, data.password);

      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'Incorrect email or password.' });

      const token = jwt.sign(
        { id: data._id },
        config.secretKey,
        { expiresIn: config.JWTExpiresIn },
      );

      res.status(200).send({ auth: true, token });
    });
  },

  signUp: (req, res) => {
    User.findOne({ email: req.body.email }, (err, data) => {
      if (err) return res.status(500).send({ auth: false, message: `Server error: ${err}` });

      if (data) return res.status(400).send({ auth: false, message: 'Current email is exist' });

      const hashedPassword = bcrypt.hashSync(req.body.password, 8);

      User.create({ email: req.body.email, password: hashedPassword, role: req.body.role }, (err, data) => {
        if (err) return res.status(500).send({ auth: false, message: `Server error: ${err}` });

        const token = jwt.sign(
          { id: data._id },
          config.secretKey,
          { expiresIn: config.JWTExpiresIn },
        );

        res.status(200).send({ auth: true, token });
      });
    });
  },

  me: (req, res) => {
    User.findById(req.userId, { password: 0 })
      .then((data) => {
        if (!data) return res.status(404).send({ auth: false, message: 'User not found.' });

        return res.status(200).send({ data, message: null });
      })
      .catch(err => res.status(500).send({ auth: false, message: `Server error: ${err}` }));
  },
};
