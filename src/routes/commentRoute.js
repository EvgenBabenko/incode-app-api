const express = require('express');

const {
  getAll,
  createComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, getAll);
router.post('/', verifyToken, createComment);
router.put('/:id', verifyToken, updateComment);
router.delete('/:id', verifyToken, deleteComment);

module.exports = router;
