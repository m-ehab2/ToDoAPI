const express = require('express');
const { deleteUser } = require('../Controllers/adminController');
const router = express.Router();

router.delete('/:id', deleteUser)
module.exports = router