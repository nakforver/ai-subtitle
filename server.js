const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "AI Khmer Subtitle Server"
  });
});

app.post("/translate", async (req, res) => {
  try {
    const text = req.body.text;

    const prompt = `
Translate this English subtitle to natural Khmer subtitle.

English:
${text}

Khmer:
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const khmer =
      data.candidates[0].content.parts[0].text;

    res.json({
      original: text,
      khmer: khmer
    });

  } catch (error) {
    console.log(error);

    res.json({
      error: "Translation failed"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
