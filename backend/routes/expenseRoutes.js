const express = require('express');

const {
    getAllExpense,
    addExpense,
    deleteExpense,
    downloadExpenseExcel
} = require('../controllers/expenseControllers.js');  // Importing expense controller functions

const { protect } = require('../middleware/authMiddleware');  // Importing authentication middleware to protect routes
const routers = express.Router();  // Creating a new router instance

routers.get('/get', protect, getAllExpense);  // Route to get all expense records, protected by authentication middleware
routers.post('/add', protect, addExpense);  // Route to add a new expense record, protected by authentication middleware    
routers.delete('/:id', protect, deleteExpense);  // Route to delete an expense record by ID, protected by authentication middleware
routers.get('/downloadexcel', protect, downloadExpenseExcel);  // Route to download expense records as an Excel file, protected by authentication middleware


module.exports = routers;  // Exporting the router instance for use in other parts of the application