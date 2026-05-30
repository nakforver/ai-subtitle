const translateBtn =
document.getElementById("translateBtn");

const speakBtn =
document.getElementById("speakBtn");

translateBtn.addEventListener(
"click",
async ()=>{

const text =
document.getElementById(
"englishText"
).value;

const result =
document.getElementById(
"result"
);

if(!text.trim()) return;

result.innerHTML =
"Translating...";

const res =
await fetch("/translate",{
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

result.innerHTML =
data.translation;

}
);

speakBtn.addEventListener(
"click",
()=>{

const text =
document.getElementById(
"result"
).innerText;

const speech =
new SpeechSynthesisUtterance(
text
);

speech.lang="km-KH";

speechSynthesis.speak(
speech
);

}
);
