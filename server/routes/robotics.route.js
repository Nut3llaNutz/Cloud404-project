const express = require('express');
const router = express.Router();
const roboticsController = require('../controllers/robotics.controller');
const auth = require('../middleware/auth');

// Public routes
router.get('/', roboticsController.getRobotics);
router.get('/:id', roboticsController.getRoboticsById);

// Protected routes
router.post('/', auth, roboticsController.createRobotics);
router.delete('/:id', auth, roboticsController.deleteRobotics);

module.exports = router;
