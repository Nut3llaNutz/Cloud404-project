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
    
    // NEW FIELDS FOR PLATFORM
    owner: { // Links this project to the User who submitted it
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    status: { // For Admin Review
        type: String, 
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending' 
    },
    isFeatured: { // For Admin Highlights on Home Page
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Project', projectSchema);