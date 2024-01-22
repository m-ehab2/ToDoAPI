const jwt = require('jsonwebtoken');

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = jwt.decode(req.header('Authorization').split(' ')[1]).role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ success: false, error: 'Access Forbidden' });
        }
        next();
    };
};

module.exports = { checkRole };
