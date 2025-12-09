// server/routes/projects.route.js
const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');
const auth = require('../middleware/auth'); // Import the new middleware

// Maps GET request on /api/projects to the getProjects function
router.get('/', projectsController.getProjects);

// Maps POST request on /api/projects to the createProject function
router.post('/', auth, projectsController.createProject);

// Maps DELETE request on /api/projects/:id to the deleteProject function
router.delete('/:id', projectsController.deleteProject);

// PATCH /api/projects/:id/like - Updates the likes count for a specific project
router.patch('/:id/like', auth, projectsController.likeProject);

// PUT /api/projects/:id/status - Admin approved/rejected
router.put('/:id/status', auth, projectsController.updateStatus);

// PUT /api/projects/:id/feature - Admin toggle featured
router.put('/:id/feature', auth, projectsController.toggleFeature);

module.exports = router;