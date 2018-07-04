const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const bcrypt = require('bcryptjs');
const config = require('../config'); // get config file

const VerifyToken = require('./VerifyToken');
const User = require('../models/User');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    // check if the password is valid
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    const token = jwt.sign({ id: user._id }, config.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });
});

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Error on the server.');
    if (user) return res.status(400).send('Duplicate email');

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }, (err, user) => {
      if (err) return res.status(500).send('There was a problem registering the user`.');

      // if user is registered without errors
      // create a token
      const token = jwt.sign({ id: user._id }, config.SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
    });
  });
});

router.get('/me', VerifyToken, (req, res, next) => {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err) return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');
    res.status(200).send(user);
  });
});

module.exports = router;
