const tasksController = require('../controllers/task.controller.js');
const router = require('express').Router();

router.get('/', tasksController.findAll);
router.post('/', tasksController.create);
router.patch('/:id', tasksController.update);
router.delete('/:id', tasksController.delete);

module.exports = router;
