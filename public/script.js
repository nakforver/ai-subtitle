const videoFile =
document.getElementById("videoFile");

const fileName =
document.getElementById("fileName");

const translateBtn =
document.getElementById("translateBtn");

const englishText =
document.getElementById("englishText");

const khmerText =
document.getElementById("khmerText");

const status =
document.getElementById("status");

const speakBtn =
document.getElementById("speakBtn");

videoFile.addEventListener(
"change",
()=>{

if(videoFile.files.length){

fileName.innerHTML =
"✅ " +
videoFile.files[0].name;

}

}
);

translateBtn.addEventListener(
"click",
async ()=>{

const text =
englishText.value.trim();

if(!text){

status.innerHTML =
"Please enter text first";

return;

}

try{

status.innerHTML =
"Translating...";

const res =
await fetch("/generate",{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({
text
})
});

const data =
await res.json();

if(data.success){

khmerText.value =
data.translation;

status.innerHTML =
"✅ Success";

}else{

status.innerHTML =
data.error;

}

}catch(err){

console.error(err);

status.innerHTML =
"Server Error";

}

}
);

speakBtn.addEventListener(
"click",
()=>{

const speech =
new SpeechSynthesisUtterance(
khmerText.value
);

speech.lang="km-KH";

speechSynthesis.speak(
speech
);

}
);
