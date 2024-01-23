const jwt = require('jsonwebtoken');

const verifyToken = () => {
    return (req, res, next) => {
        const userRole = jwt.decode(req.header('Authorization').split(' ')[1]).role;
        if (!userRole) {
            return res.status(403).json({ success: false, error: 'No Verification Token' });
        }
        next();
    };
}
module.exports = { verifyToken }