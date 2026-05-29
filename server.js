const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "running",
    message: "AI Khmer Subtitle Server"
  });
});

app.get("/subtitle", async (req, res) => {
  const text = req.query.text || "";

  // demo translate
  const khmer = "បកប្រែ: " + text;

  res.json({
    original: text,
    khmer: khmer
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
