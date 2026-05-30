const translateBtn =
document.getElementById("translateBtn");

const micBtn =
document.getElementById("micBtn");

const speakBtn =
document.getElementById("speakBtn");

const input =
document.getElementById("englishText");

const result =
document.getElementById("result");

let khmerText = "";

// Translate
translateBtn.addEventListener(
"click",
async () => {

  const text = input.value;

  if (!text.trim()) return;

  result.innerText = "Translating...";

  const response = await fetch(
    "/translate",
    {
      method: "POST",
      headers: {
        "Content-Type":
        "application/json"
      },
      body: JSON.stringify({
        text
      })
    }
  );

  const data =
  await response.json();

  khmerText =
  data.translation;

  result.innerText =
  khmerText;
});

// Voice Input
micBtn.addEventListener(
"click",
() => {

  const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

  const recognition =
  new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.start();

  recognition.onresult =
  (event) => {

    const text =
    event.results[0][0]
    .transcript;

    input.value = text;
  };
});

// Khmer Voice Output
speakBtn.addEventListener(
"click",
() => {

  if (!khmerText) return;

  const speech =
  new SpeechSynthesisUtterance(
    khmerText
  );

  speech.lang = "km-KH";

  speechSynthesis.speak(
    speech
  );
});
