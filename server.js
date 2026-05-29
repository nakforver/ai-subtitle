const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
Translate this English subtitle into natural Khmer subtitle.

English:
${text}

Khmer:
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const khmer = response.text();

    res.json({
      original: text,
      khmer: khmer.trim(),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Translation failed",
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "AI Khmer Subtitle Server",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
