const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAuthToken = (userId, role) => {
    const payload = { userId, role };
    const options = { expiresIn: '90d' };
    return jwt.sign(payload, process.env.SECRET_KEY, options);
};
const decodeReqHeader = (req) => {
    return jwt.decode(req.header('Authorization').split(' ')[1]);
};

module.exports = { generateAuthToken, decodeReqHeader }