const express = require('express');
const { deleteUser, getAllUsers } = require('../Controllers/adminController');
const router = express.Router();

router.get('/', getAllUsers)
router.delete('/:id', deleteUser)
module.exports = router