const btn =
document.getElementById(
"generateBtn"
);

btn.addEventListener(
"click",
async()=>{

const file =
document.getElementById(
"videoInput"
).files[0];

if(!file){
alert("Choose video");
return;
}

const result =
document.getElementById(
"status"
);

result.innerHTML =
"Processing...";

const formData =
new FormData();

formData.append(
"video",
file
);

const res =
await fetch(
"/generate-subtitle",
{
method:"POST",
body:formData
}
);

const data =
await res.json();

document.getElementById(
"detectedText"
).value =
data.detectedText;

document.getElementById(
"khmerText"
).value =
data.khmer;

result.innerHTML =
"Done";

}
);
