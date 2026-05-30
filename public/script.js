const btn = document.getElementById("translateBtn");

btn.addEventListener("click", async () => {
    const text = document.getElementById("inputText").value;
    const output = document.getElementById("output");

    if (!text.trim()) {
        output.innerText = "Please enter text";
        return;
    }

    output.innerText = "Translating...";

    try {
        const response = await fetch("/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        // IMPORTANT
        output.innerText = data.translation;

    } catch (error) {
        console.error(error);
        output.innerText = "Error";
    }
});
