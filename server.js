const express = require("express");
const path = require("path");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const { GoogleGenerativeAI } =
require("@google/generative-ai");

const app = express();

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

const upload = multer({
  dest: "uploads/"
});

const genAI =
new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.post(
"/generate-subtitle",
upload.single("video"),
async (req,res)=>{

try{

if(!req.file){
return res.status(400).json({
error:"No video uploaded"
});
}

const filePath = req.file.path;

const formData = new FormData();

formData.append(
"file",
fs.createReadStream(filePath)
);

formData.append(
"model",
"whisper-1"
);

const whisper =
await axios.post(
"https://api.openai.com/v1/audio/transcriptions",
formData,
{
headers:{
Authorization:
`Bearer ${process.env.OPENAI_API_KEY}`,
...formData.getHeaders()
}
}
);

const detectedText =
whisper.data.text;

const model =
genAI.getGenerativeModel({
model:"gemini-3.1-flash"
});

const prompt = `
Translate this subtitle to natural Khmer.

Return only Khmer text.

${detectedText}
`;

const result =
await model.generateContent(prompt);

const khmer =
result.response.text();

fs.unlinkSync(filePath);

res.json({
detectedText,
khmer
});

}catch(err){

console.error(err);

res.status(500).json({
error:err.message
});

}

}
);

app.post(
"/translate",
async(req,res)=>{

try{

const { text } = req.body;

const model =
genAI.getGenerativeModel({
model:"gemini-3.5-flash"
});

const result =
await model.generateContent(
`Translate to Khmer:

${text}`
);

res.json({
translation:
result.response.text()
});

}catch(err){

res.status(500).json({
error:err.message
});

}

}
);

const PORT =
process.env.PORT || 10000;

app.listen(PORT,()=>{
console.log(
`Server running on ${PORT}`
);
});
