require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
// Importing the necessary modules and configurations

const app = express();

app.use(cors({      // Enabling CORS for all origins or a specific one
    // This allows the server to accept requests from different origins
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type", "Authorization"],  // Specifying allowed headers for requests
    credentials: true,  // Allowing credentials to be included in requests
}));

app.use(express.json());    // Middleware to parse JSON request bodies

connectDB();

app.use("/api/v1/auth", authRoutes);    // Importing and using authentication routes
app.use("/api/v1/income", incomeRoutes);  // Assuming incomeRoutes is defined in a similar manner
app.use("/api/v1/expense", expenseRoutes);  // Importing and using income-related routes
app.use("/api/v1/dashboard", dashboardRoutes);  // Importing and using dashboard-related routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});