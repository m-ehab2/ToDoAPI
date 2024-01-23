const User = require("../Models/User");

const updateRole = async (req, res, next) => {
    try {
        const userMail = req.params.id;
        const matchedUser = await User.findOne({ email: userMail })
        console.log(matchedUser);
        if (!matchedUser) {
            throw 'User not found.'
        }
        await User.updateOne({ email: userMail }, { role: req.params.role })
        res.status(200).json({ status: 'Success', message: 'User role updated successfully.' });
    } catch (error) {
        next(error)
    }
}
module.exports = { updateRole }