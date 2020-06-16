const usersController = require('../controllers/users.controller.js');
const router = require('express').Router();

router.post('/', usersController.create);;

module.exports = router;
