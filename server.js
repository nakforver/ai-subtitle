const express = require("express");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

console.log("========== START ==========");
console.log("Node Version:", process.version);

if (!process.env.GEMINI_API_KEY) {
  console.log("❌ GEMINI_API_KEY MISSING");
} else {
  console.log("✅ GEMINI_API_KEY FOUND");
}

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.post("/generate", async (req, res) => {
  try {

    console.log("\n========== GENERATE ==========");

    console.log(
      "Time:",
      new Date().toISOString()
    );

    console.log(
      "Request Body:",
      req.body
    );

    const { text } = req.body;

    if (!text) {

      console.log(
        "❌ No text provided"
      );

      return res.status(400).json({
        success: false,
        error: "No text provided"
      });

    }

    console.log(
      "🚀 Sending request to Gemini..."
    );

    const model =
      genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      });

    const prompt = `
Translate the following subtitle to natural Khmer.

Return ONLY Khmer text.

${text}
`;

    const result =
      await model.generateContent(
        prompt
      );

    const translation =
      result.response
        .text()
        .trim();

    console.log(
      "✅ Translation Success"
    );

    console.log(
      translation
    );

    res.json({
      success: true,
      translation
    });

  } catch (error) {

    console.log(
      "\n========== ERROR =========="
    );

    console.error(error);

    console.log(
      "Message:",
      error.message
    );

    if (error.status) {
      console.log(
        "Status:",
        error.status
      );
    }

    if (error.response) {
      console.log(
        "Response:",
        error.response.data
      );
    }

    res.status(500).json({
      success: false,
      error:
        error.message ||
        "Server Error"
    });

  }
});

app.get("/", (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "public",
      "index.html"
    )
  );

});

const PORT =
  process.env.PORT || 10000;

app.listen(PORT, () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

  console.log(
    "========== READY ==========\n"
  );

});
