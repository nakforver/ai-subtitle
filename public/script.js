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

    const result =
      document.getElementById(
        "result"
      );

    if (!text.trim()) {
      result.innerText =
        "Please enter text";
      return;
    }

    result.innerText =
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

      result.innerText =
        data.translation ||
        data.error;

    } catch (error) {

      console.error(error);

      result.innerText =
        "Connection Error";
    }

  }
);
