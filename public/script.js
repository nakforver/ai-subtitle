const btn =
  document.getElementById(
    "translateBtn"
  );

btn.addEventListener(
  "click",
  async () => {

    const text =
      document.getElementById(
        "englishText"
      ).value;

    const output =
      document.getElementById(
        "result"
      );

    if (!text.trim()) {

      output.innerText =
        "Please enter text";

      return;
    }

    output.innerText =
      "Translating...";

    try {

      const response =
        await fetch(
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

      output.innerText =
        data.translation ||
        data.error ||
        "No result";

    } catch (error) {

      output.innerText =
        "Connection Error";

    }

});

const uploadBtn =
  document.getElementById(
    "uploadBtn"
  );

uploadBtn.addEventListener(
  "click",
  async () => {

    const file =
      document.getElementById(
        "mediaFile"
      ).files[0];

    if (!file) {

      alert(
        "Select MP3 or MP4 file"
      );

      return;
    }

    const formData =
      new FormData();

    formData.append(
      "media",
      file
    );

    document.getElementById(
      "status"
    ).innerText =
      "Uploading...";

    try {

      const response =
        await fetch(
          "/upload",
          {
            method: "POST",
            body: formData
          }
        );

      const data =
        await response.json();

      document.getElementById(
        "status"
      ).innerText =
        "Uploaded: " +
        data.original;

    } catch (error) {

      document.getElementById(
        "status"
      ).innerText =
        "Upload Failed";

    }

});
