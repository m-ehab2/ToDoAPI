const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['User', 'Admin', 'SuperAdmin'], default: 'User' },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
