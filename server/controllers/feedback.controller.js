const Feedback = require('../models/Feedback.model');

// Create new feedback
exports.createFeedback = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newFeedback = new Feedback({
            name,
            email,
            message
        });

        await newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all feedbacks (Admin only - optional for now)
exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ date: -1 });
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
