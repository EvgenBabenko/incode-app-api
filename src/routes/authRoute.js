const express = require('express');

const {
  logIn, signUp, me,
} = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/login', logIn);
router.post('/signup', signUp);
router.get('/me', verifyToken, me);

module.exports = router;
