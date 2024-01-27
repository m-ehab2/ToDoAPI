const User = require("../Models/User");

const deleteUser = async (req, res, next) => {
    try {
        const userEmail = req.params.id;
        const userToDelete = await User.findOne({ email: userEmail });
        if (!userToDelete) {
            throw 'User not found.';
        }
        await userToDelete.deleteOne();

        res.status(200).json({ status: 'Success', message: 'User deleted successfully.' });
    } catch (error) {
        next(error)
    }
}
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { email: 1, lists: 1, role: 1 });
        res.status(200).json({ status: 'Success', data: users, message: 'Users fetched successfully.' });

    } catch (error) {
        next(error)
    }
}
module.exports = { deleteUser, getAllUsers };