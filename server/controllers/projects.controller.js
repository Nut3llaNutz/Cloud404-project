// server/controllers/projects.controller.js
const Project = require('../models/project.model');

// @desc    Get all projects (READ)
// @route   GET /api/projects
exports.getProjects = async (req, res) => {
    try {
        // 1. Define Sorting Logic based on the query parameter (?sort=likes)
        let sortOptions = { dateSubmitted: -1 }; // Default: Sort by Newest first

        if (req.query.sort === 'likes') {
            sortOptions = { likes: -1 }; // Sort by likes descending (Most Liked)
        }

        // 2. Define Filtering Logic
        // In the future, projects must be 'approved' by an admin to appear in the gallery.
        // For now, we'll keep it simple, but the filter for status will go here:
        let filter = {};

        // **FUTURE: UNCOMMENT THIS LINE FOR ADMIN REVIEW IMPLEMENTATION (Sprint 5)**
        // filter = { status: 'approved' }; 

        // 3. Query the Database
        const projects = await Project.find(filter)
            .sort(sortOptions)
            // 4. Population: Fetch related user data (owner details)
            // We only expose non-sensitive fields to the public gallery:
            .populate('owner', 'username organization contactNumber projectImages');

        // 5. Respond with the retrieved data
        res.json(projects);

    } catch (err) {
        console.error("Server error retrieving projects:", err.message);
        res.status(500).send('Server error retrieving projects');
    }
};

// @desc    Create a new project (CREATE)
// @route   POST /api/projects
exports.createProject = async (req, res) => {
    if (!req.user || !req.user.id) {
        // This means the token was invalid or missing. Respond with 401.
        return res.status(401).json({ message: 'Authentication required to submit a project.' });
    }
    // We get the owner ID from the auth middleware's req.user.id
    const ownerId = req.user.id;

    // req.body contains the data sent from the React form (thanks to express.json middleware)
    const { name, category, teamMembers, description, projectImages } = req.body;

    // --- Basic Server-side Validation ---
    if (!name || !teamMembers || !description) {
        return res.status(400).json({ message: 'Missing required fields: Name, Team Members, and Description are mandatory.' });
    }

    // Create a new document instance based on the Mongoose Model
    const newProject = new Project({ name, category, teamMembers, description, owner: ownerId, projectImages: projectImages || [], });

    // TEMPORARY DEBUG: Show the exact object Mongoose is trying to save
    console.log('Attempting to save Project object:', newProject);

    try {
        const savedProject = await newProject.save(); // Save the new document to the database
        res.status(201).json(savedProject); // Send back the newly created document with 201 status
    } catch (err) {
        // CRITICAL: Log the detailed Mongoose error message
        console.error("--- Mongoose Save Failed Error: ---", err);
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

exports.likeProject = async (req, res) => {
    const userId = req.user.id;
    const projectId = req.params.id;

    try {
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        // Ensure likedBy is an array (handle potentially missing field in old docs)
        const likedBy = project.likedBy || [];
        const alreadyLiked = likedBy.includes(userId);

        let updateOperation = {};
        let actionMessage;

        if (alreadyLiked) {
            // UNLIKE ACTION: Pull user ID and decrement likes
            updateOperation = {
                $pull: { likedBy: userId },
                $inc: { likes: -1 }
            };
            actionMessage = 'unliked';
        } else {
            // LIKE ACTION: Push user ID and increment likes
            updateOperation = {
                $push: { likedBy: userId },
                $inc: { likes: 1 }
            };
            actionMessage = 'liked';
        }

        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            updateOperation,
            { new: true }
        );

        res.json({
            message: `Project successfully ${actionMessage}.`,
            project: updatedProject // Send the updated project data
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error during like operation', error: err.message });
    }
};