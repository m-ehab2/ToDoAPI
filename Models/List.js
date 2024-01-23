const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    completionStatus: {
        type: String,
        enum: ['All Done', 'Not Done'],
        default: 'Not Done'
    },
    scheduleStatus: {
        type: String,
        enum: ['Ahead of Schedule', 'Behind Schedule'],
        default: 'Ahead of Schedule'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const List = mongoose.model('List', listSchema);

module.exports = List;
