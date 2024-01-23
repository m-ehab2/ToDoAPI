const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    }
    else if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        return res.status(400).json({ success: false, error: 'Email is already registered' });
    }
    else if (err === 'Invalid credentials') {
        return res.status(400).json({ success: false, error: 'Invalid Credentials' });
    }
    res.status(500).json({
        success: false,
        error: 'Internal Server Error',
    });
}
module.exports = errorHandler