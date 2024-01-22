const jwt = require('jsonwebtoken');

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        console.log(req.header.Authorization);
        // if (!userRole || !allowedRoles.includes(userRole)) {
        //     return res.status(403).json({ success: false, error: 'Access Forbidden' });
        // }
        next();
    };
};

module.exports = { checkRole };
