const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const { decodeReqHeader } = require('../Utilities/TokenUtils');
const { toDosNotification } = require('../WebSocket/ToDosNotification');
require('dotenv').config();

const getUserInfo = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req);
        const user = await User.findById(userId).select('-password');

        if (!user) {
            throw 'User not found';
        }
        toDosNotification(req);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        next(error)
    }

}
const updateUserInfo = async (req, res, next) => {
    try {
        const { userId } = decodeReqHeader(req)
        const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT));
        const user = await User.updateOne({ _id: userId }, { username: req.body.username, email: req.body.email, password: hashedPassword })
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error)
    }
}
module.exports = { getUserInfo, updateUserInfo }