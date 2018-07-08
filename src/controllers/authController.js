const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');
const config = require('config');

const User = require('../models/User');

module.exports = {
  logIn: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send({ auth: false, message: 'Internal server error.' });

      if (!user) return res.status(404).send({ auth: false, message: 'No user found.' });

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

      const token = jwt.sign(
        { id: user._id },
        config.secretKey,
        { expiresIn: config.JWTExpiresIn },
      );

      res.status(200).send({ auth: true, token });
    });
  },

  signUp: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send({ auth: false, message: 'Internal server error.' });

      if (user) return res.status(400).send({ auth: false, message: 'Current email is exist' });

      const hashedPassword = bcrypt.hashSync(req.body.password, 8);

      User.create({ email: req.body.email, password: hashedPassword }, (err, user) => {
        if (err) return res.status(500).send({ auth: false, message: 'Internal server error.' });

        const token = jwt.sign(
          { id: user._id },
          config.secretKey,
          { expiresIn: config.JWTExpiresIn },
        );

        res.status(200).send({ auth: true, token });
      });
    });
  },

  me: (req, res) => {
    User.findById(req.userId, { password: 0 })
      .then((user) => {
        if (!user) return res.status(404).send({ auth: false, message: 'No user found.' });

        return res.status(200).send(user);
      })
      .catch(err => res.status(500).send({ auth: false, message: `Server error: ${err}` }));
  },
};
