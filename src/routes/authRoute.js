const express = require('express');

const authController = require('../controllers/authController');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.post('/login', authController.login);
// router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/me', verifyToken, authController.me);

module.exports = router;
