const express = require('express');


const {getDashboardData} = require('../controllers/dashboardControllers');  // Importing dashboard controller functions

const { protect } = require('../middleware/authMiddleware');  // Importing authentication middleware to protect routes
const router = express.Router();  // Creating a new router instance

router.get('/data', protect, getDashboardData);  // Route to get dashboard data, protected by authentication middleware

module.exports = router;  // Exporting the router instance for use in other parts of the application