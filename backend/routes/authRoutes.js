const express = require('express');      // Importing Express framework for routing
const {protect} = require('../middleware/authMiddleware');  // Importing authentication middleware to protect routes

const { registerUser, loginUser, getUserInfo } = require('../controllers/authControllers');      // Importing controller functions for user authentication

const routers = express.Router();       // Creating a new router instance

routers.post('/register', registerUser);        // Route for user registration

routers.post('/login', loginUser);      // Route for user login

routers.get('/getUser', protect, getUserInfo);      // Route to get user information, protected by authentication middleware

module.exports = routers;