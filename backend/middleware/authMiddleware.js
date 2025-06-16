const jwt = require('jsonwebtoken');  // Import JWT library
const User = require('../models/User');  // Import User model

exports.protect = async (req, res, next) => {  // Middleware to protect routes
    let token;  // Initialize token variable

    // Check if token is provided in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];  // Extract token from Authorization header
    }

    // If no token is found, respond with an error
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        // Verify the token using JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');  // Find user by ID and exclude password field
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);  // Log any errors for debugging
        res.status(401).json({ message: 'Not authorized, token failed' });  // Respond with an authorization error
    }
}