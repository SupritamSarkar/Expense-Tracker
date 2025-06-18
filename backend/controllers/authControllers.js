const jwt = require('jsonwebtoken');  // Importing JSON Web Token library

const User = require('../models/User');  // Importing the User model to interact with the database

//generate JWT token
const generateToken = (id) => {     // Function to generate a JWT token
    return jwt.sign({ id }, process.env.JWT_SECRET, {       // Sign the token with a secret key from environment variables
        expiresIn: '30d',  // Token will expire in 1 hour
    });
};

//Register user
exports.registerUser = async (req, res) =>{     // Function to handle user registration
    const { fullName, email, password } = req.body;  // Destructure user data from request body

    //Validation checks for missing fields
    if (!fullName || !email || !password) {  // Check if any field is missing
        return res.status(400).json({ message: "Please fill all fields" });  // Respond with an error message
    }

    try {
        //Check if user already exists
        const existingUser = await User.findOne({ email });  // Search for a user with the provided email
        if (existingUser) {  // If user already exists
            return res.status(400).json({ message: 'Email already in use' });  // Respond with an error message
        }
        //Create new user
        const user = await User.create({ fullName, email, password });  // Create a new user in the database

        res.status(201).json({        // Respond with a success status and user data
            _id: user._id,          // User ID
            user,    // User object containing user details
            token: generateToken(user._id),  // Generate and include JWT token
        });
    }
    catch (error) {  // Catch any errors during the process
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Server error' });  // Respond with a server error message
    }
};   

//Login User
exports.loginUser = async (req, res) =>{        // Function to handle user login
    const { email, password } = req.body;  // Destructure email and password from request body

    //Validation checks for missing fields
    if (!email || !password) {  // Check if any field is missing
        return res.status(400).json({ message: "Please fill all fields" });  // Respond with an error message
    }

    try {
        //Check if user exists
        const user = await User.findOne({ email });  // Search for a user with the provided email
        if (!user) {  // If user does not exist
            return res.status(400).json({ message: 'Invalid credentials' });  // Respond with an error message
        }

        //Check password
        const isPasswordValid = await user.comparePassword(password);  // Compare provided password with stored hashed password
        if (!isPasswordValid) {  // If password is invalid
            return res.status(400).json({ message: 'Invalid credentials' });  // Respond with an error message
        }

        res.status(200).json({       // Respond with a success status and user data
            _id: user._id,          // User ID
            user,    // User object containing user details
            token: generateToken(user._id),  // Generate and include JWT token
        });
    }
    catch (error) {  // Catch any errors during the process
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Server error' });  // Respond with a server error message
    }
};    

//Get user Info
exports.getUserInfo = async (req, res) =>{      // Function to get user information
    try{
        const user = await User.findById(req.user._id).select('-password');  // Find user by ID and exclude password from response

        if (!user) {  // If user does not exist
            return res.status(404).json({ message: 'User not found' });  // Respond with a not found error
        }

        res.status(200).json(user);  // Respond with user data
    }
    catch (error) {  // Catch any errors during the process
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Server error' });  // Respond with a server error message
    }
};        