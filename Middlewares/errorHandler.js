
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);


    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: err.message,
        });
    } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({
            success: false,
            error: 'Invalid Id',
        });
    } else if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        return res.status(400).json({
            success: false,
            error: 'Email is already registered',
        });
    } else if (err.message === 'Invalid credentials') {
        return res.status(400).json({
            success: false,
            error: 'Invalid Credentials',
        });
    } else {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err,
        });
    }
};

module.exports = errorHandler;
