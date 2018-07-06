const express = require('express');

const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', taskController.getAll);
router.get('/byUser/:id', taskController.getAllByUser);
router.post('/', taskController.create);
router.get('/:id', taskController.getOne);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router;
