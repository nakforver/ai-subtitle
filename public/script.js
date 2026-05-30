const videoInput =
document.getElementById("videoInput");

const generateBtn =
document.getElementById("generateBtn");

const status =
document.getElementById("status");

const detectedText =
document.getElementById("detectedText");

const khmerText =
document.getElementById("khmerText");

videoInput.addEventListener("change", () => {

  const file = videoInput.files[0];

  if(file){
    status.innerText =
      "Selected: " + file.name;
  }

});

generateBtn.addEventListener(
"click",
async ()=>{

try{

const file =
videoInput.files[0];

if(!file){

status.innerText =
"Please select video";

return;

}

status.innerText =
"Uploading...";

const formData =
new FormData();

formData.append(
"video",
file
);

const response =
await fetch(
"/generate-subtitle",
{
method:"POST",
body:formData
}
);

const data =
await response.json();

if(data.error){

status.innerText =
data.error;

return;

}

detectedText.value =
data.detectedText || "";

khmerText.value =
data.khmer || "";

status.innerText =
"Done";

}catch(err){

console.error(err);

status.innerText =
"Server Error";

}

}
);

const speakBtn =
document.getElementById(
"speakBtn"
);

if(speakBtn){

speakBtn.addEventListener(
"click",
()=>{

const speech =
new SpeechSynthesisUtterance(
khmerText.value
);

speech.lang =
"km-KH";

speechSynthesis.speak(
speech
);

}
);

}
