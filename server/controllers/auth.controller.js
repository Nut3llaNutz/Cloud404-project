// server/controllers/auth.controller.js
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- SIGNUP (Creates a new User) ---
// server/controllers/auth.controller.js
exports.signup = async (req, res) => {
    console.log("DEBUG: Signup Body:", req.body); // DEBUG LOG
    const { username, email, password, organization, contactNumber } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please enter all required fields: username, email, and password." });
    }

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User with that email already exists." });
        }

        // 2. Hash the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // 

        // 3. Create the New User
        user = new User({
            username,
            email,
            password: hashedPassword, // Store the HASHED password
            organization: organization || 'N/A',
            contactNumber: contactNumber || 'N/A'
        });

        await user.save();

        // 4. Respond with success (Do not send password back)
        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                organization: user.organization,
                contactNumber: user.contactNumber
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during signup');
    }
};

// --- LOGIN (Authenticates an existing User) ---
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if user exists
        const user = await User.findOne({ email });
        console.log("DEBUG: Login User Found:", user); // DEBUG LOG
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials (User not found)" });
        }

        // 2. Compare the plain-text password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials (Password incorrect)" });
        }
        // 

        // 3. Create and return a JSON Web Token (JWT)
        const payload = {
            user: {
                id: user._id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' }, // Token expires in 1 day
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        organization: user.organization,
                        contactNumber: user.contactNumber
                    }
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during login');
    }
};