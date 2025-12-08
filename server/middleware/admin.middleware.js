const User = require('../models/User.model');

module.exports = async function (req, res, next) {
    // 1. Check if user is authenticated (auth middleware should run before this)
    if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Authorization denied. No user found.' });
    }

    try {
        // 2. Fetch the user from DB to check latest role
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        // 3. Check for Admin Role
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // 4. Proceed
        next();
    } catch (err) {
        console.error("Admin Middleware Error:", err.message);
        res.status(500).send('Server Error checking admin privileges');
    }
};
