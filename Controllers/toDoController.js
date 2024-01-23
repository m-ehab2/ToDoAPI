const Todo = require("../Models/ToDo");
const List = require("../Models/List");
const { updateList } = require("../Utilities/updateListValues");

const createToDo = async (req, res, next) => {
    try {
        const { task, dueDate } = req.body;
        const listId = req.params.listId;
        const list = await List.findOne({ _id: listId });

        if (!list) {
            throw 'List not Found';
        }
        const newTodo = await Todo.create({
            task,
            dueDate,
            list: listId
        });
        updateList(listId);
        res.status(201).json({ success: true, data: newTodo, message: 'ToDo Added Successfully' });
    } catch (error) {
        next(error)
    }
}
const markAsDone = async (req, res, next) => {

}
const getAllToDos = async (req, res, next) => {
    try {
        const listId = req.params.listId;
        const list = await List.findOne({ _id: listId });
        if (!list) {
            throw 'List not Found';
        }
        const ToDos = await Todo.find({ list: listId });
        if (ToDos.length < 1) {
            throw 'List is Empty'
        }
        res.status(201).json({ data: ToDos, message: 'ToDos Fetched Successfully' });
    } catch (error) {
        next(error)
    }
}
module.exports = { createToDo, markAsDone, getAllToDos }