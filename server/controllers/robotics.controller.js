const Project = require('../models/project.model');

// Get all Robotics projects
exports.getRobotics = async (req, res) => {
    try {
        const projects = await Project.find({ category: 'Robotics' })
            .populate('owner', 'username organization contactEmail')
            .sort({ dateSubmitted: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single Robotics project by ID
exports.getRoboticsById = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id, category: 'Robotics' })
            .populate('owner', 'username organization contactEmail');

        if (!project) return res.status(404).json({ message: 'Robotics project not found' });

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new Robotics project
exports.createRobotics = async (req, res) => {
    try {
        const { name, teamMembers, description, projectImages, contactEmail, contactNumber } = req.body;

        const newProject = new Project({
            name,
            category: 'Robotics', // Enforced category
            teamMembers,
            description,
            projectImages,
            contactEmail,
            contactNumber,
            owner: req.user.id // From auth middleware
        });

        const savedProject = await newProject.save();

        // Populate owner details before returning
        await savedProject.populate('owner', 'username organization');

        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a Robotics project
exports.deleteRobotics = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id, category: 'Robotics' });

        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Check ownership
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this project' });
        }

        await project.deleteOne();
        res.json({ message: 'Robotics project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
