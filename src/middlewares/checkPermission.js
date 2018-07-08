const User = require('../models/User');

const ADMIN = 'admin';

const checkPermission = (req, res, next) => {
  User.findById(req.userId, (err, user) => {
    if (err) return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');

    if (user.role !== ADMIN) {
      return res.status(403).send('Permission denied.');
    }

    next();
  });
};

module.exports = checkPermission;
