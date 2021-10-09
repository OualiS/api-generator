const express = require('express');
const router = express.Router();

//---
const userController = require('../controllers/userController');

//---get all----
router.get('/', userController.getAll);

//---get by id----
router.get('/:id', userController.getOne);


module.exports = router;