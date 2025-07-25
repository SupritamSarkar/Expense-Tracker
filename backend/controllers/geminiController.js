const axios = require("axios");

const getTransactionInsights = async (req, res) => {
  try {
    const { transactions } = req.body;

    if (
      !transactions ||
      !Array.isArray(transactions) ||
      transactions.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Invalid or empty transactions array." });
    }

    const prompt = `
You are a personal finance assistant.

Please analyze the following list of transactions:

${JSON.stringify(transactions, null, 2)}

### Instructions:
- Format your response in **markdown**.
- Do **not** return the entire response in quotes or triple backticks.
- Make category names **bold**.
- Return only the insights, not the raw transaction data.
- Keep it under 120 words.

### Output Sections:
1. **Top Spending Categories** (3 max, with amounts)
2. **Savings Suggestions** (use bullet points)
`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    return res.status(200).json({
      insights: response.data.candidates[0].content.parts[0].text,
    });
  } catch (err) {
    console.error("Gemini Flash API error:", err.message);
    return res.status(500).json({ message: "Failed to generate insights" });
  }
};

module.exports = { getTransactionInsights };
