const express = require('express');
const router = express.Router();
const Project = require('../models/project.model');
// Assuming one model handles all. If Person 2/3 made separate models, import them. 
// Current state: All are in Project model with 'category'.

router.get('/', async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        const roboticsCount = await Project.countDocuments({ category: 'Robotics' });
        const dronesCount = await Project.countDocuments({ category: 'Drones' });

        // Count unique users who have submitted (approximate 'Innovators')
        const uniqueOwners = await Project.distinct('owner');
        const innovatorsCount = uniqueOwners.length;

        res.json({
            total: totalProjects,
            robotics: roboticsCount,
            drones: dronesCount,
            innovators: innovatorsCount
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
