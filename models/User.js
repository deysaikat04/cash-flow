const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    toc: {
        type: Date,
        default: Date.now
    },
});

module.exports = User = mongoose.model('user', UserSchema);