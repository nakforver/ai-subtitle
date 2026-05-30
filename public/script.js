document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("translateBtn");
    const input = document.getElementById("englishText");
    const result = document.getElementById("result");

    btn.addEventListener("click", async () => {

        const text = input.value.trim();

        if (!text) {
            result.innerText = "Please enter text";
            return;
        }

        result.innerText = "Translating...";

        try {

            const response = await fetch("/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text
                })
            });

            const data = await response.json();

            result.innerText = data.translation;

        } catch (err) {

            console.error(err);
            result.innerText = "Server error";

        }

    });

});
