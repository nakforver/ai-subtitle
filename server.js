const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

console.log("================================");
console.log("SERVER STARTING...");
console.log(
  process.env.GEMINI_API_KEY
    ? "GEMINI_API_KEY FOUND"
    : "GEMINI_API_KEY MISSING"
);
console.log("================================");

app.post("/translate", async (req, res) => {

  try {

    console.log("====== NEW REQUEST ======");

    const { text } = req.body;

    console.log("TEXT:", text);

    if (!text) {
      return res.status(400).json({
        error: "No text provided"
      });
    }

    const apiKey =
      process.env.GEMINI_API_KEY;

    console.log(
      "API KEY EXISTS:",
      !!apiKey
    );

    if (!apiKey) {
      return res.status(500).json({
        error:
          "GEMINI_API_KEY not found"
      });
    }

    const response =
      await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `
Translate to Khmer.

Return ONLY Khmer text.

${text}
`
                }
              ]
            }
          ]
        }
      );

    console.log(
      "GOOGLE RESPONSE OK"
    );

    const translation =
      response.data
      .candidates[0]
      .content.parts[0]
      .text;

    console.log(
      "TRANSLATION:",
      translation
    );

    res.json({
      translation
    });

  } catch (error) {

    console.log("====== ERROR ======");

    if (error.response) {

      console.log(
        "STATUS:",
        error.response.status
      );

      console.log(
        "DATA:",
        JSON.stringify(
          error.response.data,
          null,
          2
        )
      );

      return res.status(
        error.response.status
      ).json({
        error:
          error.response.data
      });

    }

    console.log(
      "MESSAGE:",
      error.message
    );

    res.status(500).json({
      error: error.message
    });

  }

});

const PORT =
  process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
