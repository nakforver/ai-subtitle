const videoInput =
document.getElementById("videoInput");

const generateBtn =
document.getElementById("generateBtn");

const speakBtn =
document.getElementById("speakBtn");

const detectedText =
document.getElementById("detectedText");

const khmerText =
document.getElementById("khmerText");

const status =
document.getElementById("status");

videoInput.addEventListener("change",()=>{

const file =
videoInput.files[0];

if(file){

status.innerHTML =
"Selected: " + file.name;

}

});

generateBtn.addEventListener(
"click",
async ()=>{

try{

const text =
detectedText.value.trim();

if(!text){

status.innerHTML =
"Please enter subtitle text";

return;

}

status.innerHTML =
"Translating...";

const response =
await fetch(
"/generate",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({
text
})
}
);

const data =
await response.json();

if(!response.ok){

status.innerHTML =
data.error;

return;

}

khmerText.value =
data.translation;

status.innerHTML =
"Done";

}catch(err){

console.error(err);

status.innerHTML =
err.message;

}

}
);

speakBtn.addEventListener(
"click",
()=>{

const text =
khmerText.value;

if(!text) return;

const speech =
new SpeechSynthesisUtterance(text);

speech.lang =
"km-KH";

speechSynthesis.speak(speech);

}
);
