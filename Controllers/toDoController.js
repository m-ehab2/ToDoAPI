const Todo = require("../Models/ToDo");
const List = require("../Models/List");
const { updateList } = require("../Utilities/updateListValues");
const { decodeReqHeader } = require("../Utilities/TokenUtils");
const createToDo = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const { task, dueDate } = req.body;
        const listId = req.params.listId;
        const list = await List.findOne({ _id: listId, user: userId });
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
    try {
        const listId = req.params.listId;
        const toDoId = req.params.toDoId;
        const { userId } = decodeReqHeader(req);
        const list = await List.findOne({ _id: listId, user: userId });
        if (!list) {
            throw 'List not Found';
        }
        const toDoToDelete = await Todo.findOne({ _id: toDoId, list: listId });
        if (!toDoToDelete) {
            throw 'ToDo not found'
        }
        const update = await Todo.updateOne({ _id: toDoId }, { $set: { completed: true } })
        updateList(listId);
        res.status(201).json({ success: true, message: 'ToDo marked as Done Successfully' });
    } catch (error) {
        next(error)
    }
}
const getAllToDos = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const listId = req.params.listId;
        const list = await List.findOne({ _id: listId, user: userId });
        if (!list) {
            throw 'List not Found';
        }
        const ToDos = await Todo.find({ list: listId });
        if (ToDos.length < 1) {
            throw 'List is Empty'
        }
        res.status(201).json({ ToDos: ToDos, message: 'ToDos Fetched Successfully' });
    } catch (error) {
        next(error)
    }
}
const getAllGroupedStatus = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const listId = req.params.listId;

        const list = await List.findOne({ _id: listId, user: userId });
        if (!list) {
            console.log('List not Found');
            throw new Error('List not Found');
        }

        const todos = await Todo.find({ list: listId });
        if (todos.length < 1) {
            console.log('List is Empty');
            throw new Error('List is Empty');
        }

        const results = await Todo.aggregate([
            { $match: { list: list._id } },
            {
                $group: {
                    _id: '$completed',
                    count: { $sum: 1 },
                    todos: {
                        $push: {
                            _id: "$_id",
                            task: "$task",
                            dueDate: '$dueDate'
                        }
                    }
                }
            }
        ]);

        res.status(201).json({ Data: results, message: 'ToDos Fetched Successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
const getAllGroupedDay = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const listId = req.params.listId;

        const list = await List.findOne({ _id: listId, user: userId });
        if (!list) {
            console.log('List not Found');
            throw new Error('List not Found');
        }

        const todos = await Todo.find({ list: listId });
        if (todos.length < 1) {
            console.log('List is Empty');
            throw new Error('List is Empty');
        }

        const results = await Todo.aggregate([
            { $match: { list: list._id } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                    todos: {
                        $push: {
                            _id: "$_id",
                            task: "$task",
                            dueDate: '$dueDate'
                        }
                    }
                }
            },
            { $sort: { _id: -1 } }
        ]);

        res.status(201).json({ Data: results, message: 'ToDos Fetched Successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
const getAllGroupedMonth = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const listId = req.params.listId;

        const list = await List.findOne({ _id: listId, user: userId });
        if (!list) {
            console.log('List not Found');
            throw new Error('List not Found');
        }

        const todos = await Todo.find({ list: listId });
        if (todos.length < 1) {
            console.log('List is Empty');
            throw new Error('List is Empty');
        }

        const results = await Todo.aggregate([
            { $match: { list: list._id } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 },
                    todos: {
                        $push: {
                            _id: "$_id",
                            task: "$task",
                            dueDate: '$dueDate'
                        }
                    }
                }
            },
            { $sort: { _id: -1 } }
        ]);

        res.status(201).json({ Data: results, message: 'ToDos Fetched Successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteToDo = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const listId = req.params.listId;
        const toDoId = req.params.toDoId;
        const list = await List.findOne({ _id: listId, user: userId });
        if (!list) {
            throw 'List not Found';
        }
        const toDoToDelete = await Todo.findOne({ _id: toDoId, list: listId });
        if (!toDoToDelete) {
            throw 'ToDo not found'
        }
        const deleted = await Todo.deleteOne({ _id: toDoId })
        updateList(listId);
        res.status(201).json({ success: true, message: 'ToDo Deleted Successfully' });
    } catch (error) {
        next(error)
    }
}

module.exports = { createToDo, markAsDone, getAllToDos, deleteToDo, getAllGroupedStatus, getAllGroupedDay, getAllGroupedMonth }