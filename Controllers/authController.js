const bcrypt = require('bcryptjs');
const { validateSignUp, loginSchema } = require('../Utilities/schemaValidation');
const User = require('../Models/User');
const { generateAuthToken } = require('../Utilities/TokenUtils');
require('dotenv').config();

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const validated = validateSignUp.validate({ username, email, password })
        if (validated.error) {
            throw validated.error
        }
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
        const newUser = await User.create({ username: username, email: email, password: hashedPassword })
        const token = generateAuthToken(newUser._id, newUser.role);
        res.status(201).json({ success: true, message: 'User registered successfully', User: username, token: token });
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validated = loginSchema.validate({ email, password })
        if (validated.error) {
            throw validated.error
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw "Invalid credentials"
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            throw "Invalid credentials"
        }
        const token = generateAuthToken(user._id, user.role);
        res.status(200).json({ success: true, message: "logged in Successfully", User: user.username, token: token });

    } catch (error) {
        console.log(error);
        next(error)
    }
}
module.exports = { registerUser, login }