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

        res.status(201).json({ status: 'Success', data: newList, message: 'List created successfully.' });
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
        const Lists = await List.find({ user: user._id })

        res.status(201).json({ status: 'Success', data: Lists, message: 'Lists of User fetched Successfully' });
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
        const Lists = await List.findOneAndDelete({ _id: listId })
        if (!Lists) {
            throw 'List not found.';
        }

        res.status(201).json({ status: 'Success', data: Lists, message: 'List Deleted Successfully' });
    } catch (error) {
        next(error)
    }
}
module.exports = { createList, getAllLists, deleteList }