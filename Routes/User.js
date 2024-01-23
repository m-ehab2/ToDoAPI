const express = require('express');
const { getUserInfo, updateUserInfo } = require('../Controllers/userController');
const router = express.Router();

router.get('/', getUserInfo)
router.patch('/', updateUserInfo)
module.exports = router