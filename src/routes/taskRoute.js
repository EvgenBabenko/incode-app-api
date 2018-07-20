const express = require('express');

const {
  getAll,
  createTask,
  getOne,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const checkPermission = require('../middlewares/checkPermission');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// router.get('/', getAll);
// router.post('/', createTask);
// // router.get('/:id', getOne);
// // router.put('/:id', updateTask);
// router.delete('/:id', deleteTask);

// should be like that, but don't work in app and test too not pass :(

router.get('/', verifyToken, getAll);
router.post('/', verifyToken, checkPermission, createTask);
router.get('/:id', verifyToken, getOne);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, checkPermission, deleteTask);

module.exports = router;
