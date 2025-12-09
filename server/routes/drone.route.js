const express = require('express');
const router = express.Router();
const droneController = require('../controllers/drone.controller');
const auth = require('../middleware/auth');

// Public routes
router.get('/', droneController.getDrones);
router.get('/:id', droneController.getDroneById);

// Protected routes
router.post('/', auth, droneController.createDrone);
router.delete('/:id', auth, droneController.deleteDrone);

module.exports = router;
