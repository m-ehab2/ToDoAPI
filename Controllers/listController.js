const List = require("../Models/List");
const User = require("../Models/User");
const { decodeReqHeader } = require("../Utilities/TokenUtils");

const createList = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const user = await User.findById(userId);
        if (!user) {
            throw 'User not found.'
        }
        const { title } = req.body;
        const newList = await List.create({ title: title, user: user._id })
        await User.updateOne({ _id: userId }, { $push: { lists: newList._id } });

        res.status(201).json({ data: newList, message: 'List created successfully.' });
    } catch (error) {
        next(error)
    }
}
const getAllLists = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const user = await User.findById(userId);
        if (!user) {
            throw 'User not found.';
        }
        const Lists = await List.find({ user: user._id }, { title: 1 })

        res.status(201).json({ data: Lists });
    } catch (error) {
        next(error)
    }
}
const deleteList = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const user = await User.findById(userId);
        const listId = req.params.id
        if (!user) {
            throw 'User not found.';
        }
        await User.updateOne({ _id: userId }, { $pull: { lists: listId } });
        const Lists = await List.findOneAndDelete({ _id: listId })
        if (!Lists) {
            throw 'List not found.';
        }

        res.status(201).json({ data: Lists, message: 'List Deleted Successfully' });
    } catch (error) {
        next(error)
    }
}
const getList = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const user = await User.findById(userId);
        if (!user) {
            throw 'User not found.';
        }
        const listId = req.params.id
        const foundList = await List.findOne({ _id: listId, user: user._id })
        if (!foundList) {
            throw 'List Id Not Found';
        }
        res.status(201).json({ data: foundList, message: 'List fetched Successfully' });
    } catch (error) {
        next(error)
    }
}
const updateList = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const user = await User.findById(userId);
        if (!user) {
            throw 'User not found.';
        }
        const listId = req.params.id
        const updatedList = await List.updateOne({ _id: listId, user: user._id }, { $set: { title: req.body.title, updatedAt: Date(Date.now()) } })
        if (!updatedList.matchedCount) {
            throw 'List Id Not Found';
        }
        res.status(201).json({ data: updatedList, message: 'List Updated Successfully' });
    } catch (error) {
        next(error)
    }
}
module.exports = { createList, getAllLists, deleteList, getList, updateList }