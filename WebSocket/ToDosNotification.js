const Todo = require("../Models/ToDo");
const User = require("../Models/User");
const { decodeReqHeader } = require("../Utilities/TokenUtils");


const toDosNotification = async (req) => {
    try {
        const { userId } = decodeReqHeader(req);
        const user = await User.findOne({ _id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        const listIds = user.lists;
        const toDos = await Todo.find({ list: { $in: listIds } });
        console.log(toDos);

    } catch (error) {
        throw (error)
    }
};

module.exports = { toDosNotification }