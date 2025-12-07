// server/models/Project.model.js
const mongoose = require('mongoose');

// Defines the fields and validation rules for a project document
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // This field must be present
        trim: true,
    },
    category: {
        type: String,
        enum: ['Agriculture', 'Defense', 'Healthcare', 'Education', 'Other'],
        default: 'Other',
    },
    teamMembers: {
        type: [String], // Array of strings for names
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateSubmitted: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', projectSchema);