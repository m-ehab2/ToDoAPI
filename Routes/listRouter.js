const express = require('express');
const { createList, getAllLists, deleteList, getList, updateList } = require('../Controllers/listController');
const { createToDo, getAllToDos, markAsDone, deleteToDo, getAllGroupedStatus, getAllGroupedDay, getAllGroupedMonth } = require('../Controllers/toDoController');
const router = express.Router();

router.post('/', createList);
router.get('/', getAllLists);
router.get('/:id', getList)
router.delete('/:id', deleteList)
router.patch('/:id', updateList)
//To Do Routes
router.post('/:listId', createToDo)
router.get('/:listId/ToDos', getAllToDos)
router.get('/:listId/ToDos/Complete', getAllGroupedStatus)
router.get('/:listId/ToDos/day', getAllGroupedDay)
router.get('/:listId/ToDos/month', getAllGroupedMonth)
router.patch('/:listId/:toDoId', markAsDone)
router.delete('/:listId/:toDoId', deleteToDo)


module.exports = router