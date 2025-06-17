const User = require('../models/User');
const Income = require('../models/Income');  // Importing the Income model for database operations
const xlsx = require('xlsx');  // Importing the xlsx library for handling Excel files

// This file contains the controller functions for handling income-related operations such as adding, retrieving, deleting, and downloading income records in Excel format.

//Add Income 
exports.addIncome = async (req, res) => {
    const { icon, source, amount, date, description } = req.body;  // Destructuring the request body to get income details
    const userId = req.user.id;  // Getting the user ID from the authenticated user

    try {
        // Creating a new income record
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date,
            description
        });

        await newIncome.save();  // Saving the new income record to the database

        res.status(201).json({ success: true, data: newIncome });  // Sending a success response with the created income data
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  // Handling errors and sending an error response
    }
}

//Get all income source
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;  // Getting the user ID from the authenticated user

    try {
        // Fetching all income records for the authenticated user
        const incomes = await Income.find({ userId }).sort({ date: -1 });  // Sorting by date in descending order

        res.status(200).json({ success: true, data: incomes });  // Sending a success response with the income data
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  // Handling errors and sending an error response
    }
}

//Delete income source by id
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;  // Getting the income ID from the request parameters
    const userId = req.user.id;  // Getting the user ID from the authenticated user

    try {
        // Finding and deleting the income record by ID and user ID
        const income = await Income.findOneAndDelete({ _id: id, userId });

        if (!income) {
            return res.status(404).json({ success: false, message: 'Income not found' });  // Handling case where income record is not found
        }

        res.status(200).json({ success: true, message: 'Income deleted successfully' });  // Sending a success response
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  // Handling errors and sending an error response
    }
}

//Download income source as excel file
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;  // Getting the user ID from the authenticated user

    try {
        // Fetching all income records for the authenticated user
        const incomes = await Income.find({ userId }).sort({ date: -1 });  // Sorting by date in descending order

        if (incomes.length === 0) {
            return res.status(404).json({ success: false, message: 'No income records found' });  // Handling case where no income records are found
        }

        // Creating a excel string from the income records
        const data = incomes.map((income) => ({
            Source: income.source,      // Mapping income fields to CSV columns
            Amount: income.amount,      
            Date: income.date.toISOString().split('T')[0],  // Formatting date to YYYY-MM-DD
            Description: income.description || 'N/A'
        }));

        const wb = xlsx.utils.book_new();       // Creating a new workbook for the Excel file
        const ws = xlsx.utils.json_to_sheet(data);  // Converting the income data to a worksheet
        xlsx.utils.book_append_sheet(wb, ws, 'Income');  // Appending the worksheet to the workbook
        xlsx.writeFile(wb, 'income_details.xlsx');  // Writing the workbook to a file
        res.download('income_details.xlsx');

    
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });  // Handling errors and sending an error response
    }
}