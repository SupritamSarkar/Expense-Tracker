const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({   // Defining the schema for Income model
    userId: {
        type: mongoose.Schema.Types.ObjectId,     // Reference to the User model
        ref: 'User',            
        required: true
    },
    icon: {
        type: String,
    },
    source: {
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

const Income = mongoose.model('Income', incomeSchema);  // Creating the Income model from the schema
module.exports = Income;  // Exporting the Income model for use in other parts of the application