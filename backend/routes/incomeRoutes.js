const express = require('express');  // Importing Express framework for routing

const  {
    getAllIncome,
    addIncome,
    deleteIncome,
    downloadIncomeExcel
} = require('../controllers/incomeControllers.js');  // Importing income controller functions

const { protect } = require('../middleware/authMiddleware');  // Importing authentication middleware to protect routes

const routers = express.Router();  // Creating a new router instance

routers.get('/get', protect, getAllIncome);  // Route to get all income records, protected by authentication middleware
routers.post('/add', protect, addIncome);  // Route to add a new income record, protected by authentication middleware
routers.delete('/:id', protect, deleteIncome);  // Route to delete an income record by ID, protected by authentication middleware
routers.get('/downloadexcel', protect, downloadIncomeExcel);  // Route to download income records as an Excel file, protected by authentication middleware

module.exports = routers;  // Exporting the router instance for use in other parts of the application
// This code defines the income-related routes for the application, including fetching, adding, deleting, and downloading income records in Excel format. It uses Express for routing and includes authentication middleware to protect certain routes. The controller functions are imported from a separate file to handle the business logic for each route.