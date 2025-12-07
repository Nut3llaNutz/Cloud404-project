// server/routes/projects.route.js
const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects.controller');

// Maps GET request on /api/projects to the getProjects function
router.get('/', projectsController.getProjects); 

// Maps POST request on /api/projects to the createProject function
router.post('/', projectsController.createProject); 

// Maps DELETE request on /api/projects/:id to the deleteProject function
router.delete('/:id', projectsController.deleteProject); 

module.exports = router;