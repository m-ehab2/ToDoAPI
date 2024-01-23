const express = require('express');
const { updateRole } = require('../Controllers/superController');
const router = express.Router();

router.patch('/:id/:role', updateRole)
module.exports = router