const Income = require("../models/Income"); // Importing the income model for database operations
const Expense = require("../models/Expense"); // Importing the expense model for database operations

const mongoose = require("mongoose"); // Importing Mongoose Types for ObjectId manipulation
const { isValidObjectId } = mongoose; // Importing Mongoose's isValidObjectId function to validate MongoDB Object IDs

//dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; // Getting the user ID from the authenticated user

    const userObjectId = new mongoose.Types.ObjectId(String(userId)); // Converting user ID to MongoDB Object ID

    //Fetch total income and expense
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } }, // Matching income records for the user
      { $group: { _id: null, total: { $sum: "$amount" } } }, // Grouping to calculate total income
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } }, // Matching expense records for the user
      { $group: { _id: null, total: { $sum: "$amount" } } }, // Grouping to calculate total expense
    ]);

    // Fetching the last 60 days income transactions
    const Last60DaysIncomeTransactions = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      }, // Filtering transactions from the last 60 days
    })
      .sort({ date: -1 })
      .limit(60); // Sorting by date in descending order and limiting to 60 records

    //get total income for last 60 days
    const totalIncomeLast60Days = Last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    ); // Calculating total income for the last 60 days

    // Fetching the last 60 days expense transactions
    const Last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      }, // Filtering transactions from the last 60 days
    })
      .sort({ date: -1 })
      .limit(30); // Sorting by date in descending order and limiting to 60 records

    //get total expense for last 60 days
    const totalExpenseLast30Days = Last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    ); // Calculating total expense for the last 60 days

    // Fetching the last 7 income + expense transactions
    const lastIncome = (
      await Income.find({ userId }).sort({ date: -1 }).limit(7)            // Sorting by date in descending order and limiting to 7 records
    ).map((transaction) => ({           // Mapping the transaction to include type and converting to object
      ...transaction.toObject(),                  
      type: "income",
    }));

    const lastExpense = (             // Fetching the last 7 expense transactions
      await Expense.find({ userId }).sort({ date: -1 }).limit(7)               // Sorting by date in descending order and limiting to 7 records
    ).map((transaction) => ({      // Mapping the transaction to include type and converting to object
      ...transaction.toObject(),
      type: "expense",
    }));

    const lastTransactions = [...lastIncome, ...lastExpense]         // Merging last income and expense transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7);     // Sorting by date in descending order and limiting to 7 records

    //final respone
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0), // Calculating total balance
      totalIncome: totalIncome[0]?.total || 0, // Total income
      totalExpense: totalExpense[0]?.total || 0, // Total expense

      last30DaysExpenses: {
        total: totalExpenseLast30Days, // Total expense for the last 60 days
        transactions: Last30DaysExpenseTransactions, // Last 60 days expense transactions
      },
      last60DaysIncome: {
        total: totalIncomeLast60Days, // Total income for the last 60 days
        transactions: Last60DaysIncomeTransactions, // Last 60 days income transactions
      },
      lastTransactions: lastTransactions.slice(0, 7), // Last 7 transactions (income + expense)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message }); // Handling errors and sending an error response
  }
};
