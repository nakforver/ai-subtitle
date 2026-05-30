const generateBtn =
document.getElementById("generateBtn");

const speakBtn =
document.getElementById("speakBtn");

const status =
document.getElementById("status");

const detectedText =
document.getElementById("detectedText");

const khmerText =
document.getElementById("khmerText");

const videoInput =
document.getElementById("videoInput");

/* Video Select */

if (videoInput) {

  videoInput.addEventListener(
    "change",
    () => {

      const file =
      videoInput.files[0];

      if (file) {

        status.innerHTML =
          "Selected: " +
          file.name;

      }

    }
  );

}

/* Generate */

generateBtn.addEventListener(
  "click",
  async () => {

    try {

      status.innerHTML =
        "Generating...";

      const text =
        detectedText.value.trim();

      if (!text) {

        status.innerHTML =
          "Please enter text first";

        return;
      }

      const response =
        await fetch(
          "/generate",
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

      console.log(data);

      if (!response.ok) {

        throw new Error(
          data.error ||
          "Server Error"
        );

      }

      khmerText.value =
        data.translation || "";

      status.innerHTML =
        "Done";

    } catch (err) {

      console.error(err);

      status.innerHTML =
        err.message;

    }

  }
);

/* Speak Khmer */

if (speakBtn) {

  speakBtn.addEventListener(
    "click",
    () => {

      const text =
        khmerText.value;

      if (!text) return;

      const speech =
        new SpeechSynthesisUtterance(
          text
        );

      speech.lang =
        "km-KH";

      speechSynthesis.speak(
        speech
      );

    }
  );

}
