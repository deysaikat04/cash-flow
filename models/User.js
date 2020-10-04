const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    ip: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    toc: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('user', UserSchema);