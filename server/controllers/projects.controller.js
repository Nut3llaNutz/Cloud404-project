// server/controllers/projects.controller.js
const Project = require('../models/project.model');

// @desc    Get all projects (READ)
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
    try {
        // Use the Mongoose Model to find all documents, sorting by newest first
        const projects = await Project.find().sort({ dateSubmitted: -1 });
        res.status(200).json(projects); // Send the list of projects back as JSON
    } catch (err) {
        // If the database fails, send a 500 Server Error
        res.status(500).json({ message: 'Server error retrieving projects' });
    }
};

// @desc    Create a new project (CREATE)
// @route   POST /api/projects
exports.createProject = async (req, res) => {
    // req.body contains the data sent from the React form (thanks to express.json middleware)
    const { name, category, teamMembers, description } = req.body;
    
    // --- Basic Server-side Validation ---
    if (!name || !teamMembers || !description) {
        return res.status(400).json({ message: 'Missing required fields: Name, Team Members, and Description are mandatory.' });
    }
    
    // Create a new document instance based on the Mongoose Model
    const newProject = new Project({ name, category, teamMembers, description });

    try {
        const savedProject = await newProject.save(); // Save the new document to the database
        res.status(201).json(savedProject); // Send back the newly created document with 201 status
    } catch (err) {
        // If Mongoose validation fails (e.g., wrong data type), send a 400 Bad Request
        res.status(400).json({ message: err.message });
    }
};

// Optional: Add the DELETE function for better marks
// @desc    Delete a project (DELETE)
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
    try {
        // req.params.id gets the ID from the URL (e.g., /api/projects/60c1d293d6...)
        const result = await Project.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Could not delete project' });
    }
};