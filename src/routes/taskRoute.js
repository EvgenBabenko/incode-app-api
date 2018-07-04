const express = require('express');

const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', taskController.findAll);
router.post('/', taskController.create);
router.get('/:id', taskController.findOne);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;
