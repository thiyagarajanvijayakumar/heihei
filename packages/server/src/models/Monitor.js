const mongoose = require('mongoose');

const MonitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['HTTP', 'HTTPS'],
        default: 'HTTP'
    },
    method: {
        type: String,
        enum: ['GET', 'POST', 'PUT', 'DELETE'],
        default: 'GET'
    },
    status: {
        type: String,
        enum: ['Up', 'Down', 'Pending'],
        default: 'Pending'
    },
    lastChecked: {
        type: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Monitor', MonitorSchema);
