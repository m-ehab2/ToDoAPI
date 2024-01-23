const User = require("../Models/User");

const deleteUser = async (req, res, next) => {
    try {
        const userEmail = req.params.id;
        const userToDelete = await User.findOne({ email: userEmail });
        if (!userToDelete) {
            return res.status(404).json({ status: 'Error', message: 'User not found.' });
        }
        await userToDelete.deleteOne();

        res.status(200).json({ status: 'Success', message: 'User deleted successfully.' });
    } catch (error) {
        next(error)
    }
}
module.exports = { deleteUser };