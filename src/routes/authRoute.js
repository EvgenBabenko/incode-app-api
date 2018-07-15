const express = require('express');

const {
  logIn,
  signUp,
  me,
} = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/me', verifyToken, me);
router.post('/login', logIn);
router.post('/signup', signUp);

module.exports = router;
