const express = require("express");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

console.log("========== START ==========");
console.log("Node Version:", process.version);
console.log(
  process.env.GEMINI_API_KEY
    ? "✅ GEMINI_API_KEY FOUND"
    : "❌ GEMINI_API_KEY MISSING"
);
console.log("===========================");

let genAI = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );
}

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    apiKey: !!process.env.GEMINI_API_KEY
  });
});

app.post("/translate", async (req, res) => {
  try {
    console.log("====== TRANSLATE REQUEST ======");

    const { text } = req.body;

    console.log("Text:", text);

    if (!text) {
      console.log("❌ No text");

      return res.status(400).json({
        error: "No text provided"
      });
    }

    if (!genAI) {
      console.log("❌ GEMINI_API_KEY missing");

      return res.status(500).json({
        error: "GEMINI_API_KEY missing"
      });
    }

    console.log("Loading model...");

    const model =
      genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      });

    console.log("Generating...");

    const result =
      await model.generateContent(
        `Translate to Khmer only:\n${text}`
      );

    const translation =
      result.response.text();

    console.log("✅ Success");

    res.json({
      translation
    });

  } catch (error) {

    console.log("========== ERROR ==========");
    console.log(error);

    if (error.response) {
      console.log(
        "Status:",
        error.response.status
      );

      console.log(
        "Data:",
        error.response.data
      );
    }

    console.log("===========================");

    res.status(500).json({
      error: error.message,
      details: String(error)
    });
  }
});

app.get("*", (req, res) => {
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
});
