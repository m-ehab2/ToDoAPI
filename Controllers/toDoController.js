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
module.exports = { createToDo }