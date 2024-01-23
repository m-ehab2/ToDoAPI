const express = require('express');
const { createList, getAllLists, deleteList } = require('../Controllers/listController');
const router = express.Router();

router.post('/', createList);
router.get('/', getAllLists);
router.delete('/:id', deleteList)
module.exports = router