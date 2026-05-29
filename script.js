async function translateText() {
  const text = document.getElementById("english").value;

  const response = await fetch(
    "https://ai-subtitle-yl21.onrender.com/translate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }
  );

  const data = await response.json();

  document.getElementById("result").innerText =
    data.translation;
}
