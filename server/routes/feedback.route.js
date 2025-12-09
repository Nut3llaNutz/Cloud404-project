const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');

// Public route to submit feedback
router.post('/', feedbackController.createFeedback);

// Route to get feedbacks (could be protected in future)
router.get('/', feedbackController.getFeedbacks);

module.exports = router;
