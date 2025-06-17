const User = require('../models/User');
const Expense = require('../models/Expense');  // Importing the expense model for database operations
const xlsx = require('xlsx');  // Importing the xlsx library for handling Excel files

// This file contains the controller functions for handling expense-related operations such as adding, retrieving, deleting, and downloading expense records in Excel format.

//Add Expense 
exports.addExpense = async (req, res) => {
    const { icon, category, amount, date, description } = req.body;  // Destructuring the request body to get expense details
    const userId = req.user.id;  // Getting the user ID from the authenticated user

    try {
        // Creating a new expense record
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date,
            description
        });

        await newExpense.save();  // Saving the new expense record to the database

        res.status(201).json({ success: true, data: newExpense });  // Sending a success response with the created Expense data
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  // Handling errors and sending an error response
    }
}

//Get all expense source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;  // Getting the user ID from the authenticated user

    try {
        // Fetching all expense records for the authenticated user
        const expenses = await Expense.find({ userId }).sort({ date: -1 });  // Sorting by date in descending order

        res.status(200).json({ success: true, data: expenses });  // Sending a success response with the expense data
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  // Handling errors and sending an error response
    }
}

//Delete expense source by id
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;  // Getting the expense ID from the request parameters
    const userId = req.user.id;  // Getting the user ID from the authenticated user

    try {
        // Finding and deleting the expense record by ID and user ID
        const expense = await Expense.findOneAndDelete({ _id: id, userId });

        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense not found' });  // Handling case where expense record is not found
        }

        res.status(200).json({ success: true, message: 'Expense deleted successfully' });  // Sending a success response
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  // Handling errors and sending an error response
    }
}

//Download expense source as excel file
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;  // Getting the user ID from the authenticated user

    try {
        // Fetching all expense records for the authenticated user
        const expenses = await Expense.find({ userId }).sort({ date: -1 });  // Sorting by date in descending order

        if (expenses.length === 0) {
            return res.status(404).json({ success: false, message: 'No expense records found' });  // Handling case where no expense records are found
        }

        // Creating a excel string from the expens records
        const data = expenses.map((expense) => ({
            Category: expense.category,      // Mapping expense fields to CSV columns
            Amount: expense.amount,      
            Date: expense.date.toISOString().split('T')[0],  // Formatting date to YYYY-MM-DD
            Description: expense.description || 'N/A'
        }));

        const wb = xlsx.utils.book_new();       // Creating a new workbook for the Excel file
        const ws = xlsx.utils.json_to_sheet(data);  // Converting the expense data to a worksheet
        xlsx.utils.book_append_sheet(wb, ws, 'expense');  // Appending the worksheet to the workbook
        xlsx.writeFile(wb, 'expense_details.xlsx');  // Writing the workbook to a file
        res.download('expense_details.xlsx');

    
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  // Handling errors and sending an error response
    }
}