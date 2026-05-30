const btn = document.getElementById("translateBtn");

btn.addEventListener("click", async () => {

    const text = document.getElementById("englishText").value;
    const output = document.getElementById("result");

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
            body: JSON.stringify({
                text: text
            })
        });

        const data = await response.json();

        console.log(data);

        output.innerText =
            data.translation ||
            data.error ||
            "No translation returned";

    } catch (error) {

        console.error(error);

        output.innerText = "Connection Error";
    }

});
