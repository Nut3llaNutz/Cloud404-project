// server/models/User.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: { // This will store the HASHED password
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    organization: { // Stores team/organization info
        type: String,
        trim: true
    },
    contactNumber: { // New Contact Field (Changed name from contactEmail based on feedback context)
        type: String,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);