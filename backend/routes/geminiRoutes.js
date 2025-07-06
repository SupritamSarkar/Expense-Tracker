const express = require("express");
const { getTransactionInsights } = require("../controllers/geminiController");
const router = express.Router();

router.post("/summary", getTransactionInsights);

module.exports = router;
