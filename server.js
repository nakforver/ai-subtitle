const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/translate", (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            error: "No text provided"
        });
    }

    // Demo translation
    res.json({
        translation: "បកប្រែ៖ " + text
    });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
