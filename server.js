const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/subtitle", async (req, res) => {

  const text = req.body.text || "";

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
