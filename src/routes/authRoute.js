const express = require('express');

const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/login', authController.login);
// router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.post('/admin', authController.registerAdmin);
router.get('/me', verifyToken, authController.me);

module.exports = router;
