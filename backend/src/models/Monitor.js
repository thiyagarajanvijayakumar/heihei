const mongoose = require('mongoose');

const monitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['HTTP', 'HTTPS'], default: 'HTTP' },
    method: { type: String, default: 'GET' },
    location: { type: String, default: 'India' },
    frequency: { type: String, default: '5 min' },
    emails: [{ type: String }],
    status: { type: String, default: 'up' }, // 'up' | 'down'
    uptime: { type: Number, default: 100 },
    lastRun: { type: Date, default: Date.now },
    history: [{
        timestamp: { type: Date, default: Date.now },
        status: { type: String }, // 'up' | 'down'
        responseTime: { type: Number } // in ms
    }]
}, { timestamps: true });

module.exports = mongoose.model('Monitor', monitorSchema);
