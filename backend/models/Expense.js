const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({  // Defining the schema for Expense model
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
        ref: 'User',
        required: true
    },
    icon: {
        type: String,
    },
    category: {     // Category of the expense like food , rent etc.
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);  // Creating the Expense model from the schema
module.exports = Expense;  // Exporting the Expense model for use in other parts of the application
// This model will be used to interact with the expenses collection in the MongoDB database, allowing for operations such as creating, reading, updating, and deleting expense records.