const express = require("express");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

console.log(
  process.env.GEMINI_API_KEY
    ? "GEMINI API KEY FOUND"
    : "GEMINI API KEY MISSING"
);

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "No text provided"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
Translate this English subtitle to natural Khmer.

Return ONLY the Khmer translation.

${text}
`;

    const result = await model.generateContent(
      prompt
    );

    const translation =
      result.response.text().trim();

    res.json({
      translation
    });

  } catch (error) {

    console.error("GEMINI ERROR:");
    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
