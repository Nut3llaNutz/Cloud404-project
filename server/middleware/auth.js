// server/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Get token from the header
    // The token is usually sent as 'Bearer [token]'
    const token = req.header('x-auth-token');

    // 2. Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        // 3. Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attach the user data to the request object
        // This makes the user ID available in the next function (the controller)
        req.user = decoded.user;

        // 5. Move to the next middleware or route handler
        next();

    } catch (err) {
        // Token is not valid (expired, corrupted, wrong secret)
        res.status(401).json({ message: 'Token is not valid.' });
    }
};