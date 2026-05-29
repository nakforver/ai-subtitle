require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/translate", async (req, res) => {
  const text = req.body.text;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Translate English to Khmer:\n${text}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const khmer =
      data.candidates[0].content.parts[0].text;

    res.json({
      translation: khmer,
    });
  } catch (err) {
    console.log(err);

    res.json({
      translation: "Error",
    });
  }
});

app.listen(10000, () => {
  console.log("Server running on port 10000");
});
