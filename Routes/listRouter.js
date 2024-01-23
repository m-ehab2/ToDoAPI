const express = require('express');
const { createList, getAllLists, deleteList, getList, updateList } = require('../Controllers/listController');
const { createToDo, getAllToDos } = require('../Controllers/toDoController');
const router = express.Router();

router.post('/', createList);
router.get('/', getAllLists);
router.get('/:id', getList)
router.delete('/:id', deleteList)
router.patch('/:id', updateList)
//To Do Routes
router.post('/:listId', createToDo)
router.get('/:listId/ToDos', getAllToDos)

module.exports = router