document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("volunteerForm");
    const errorMessage = document.getElementById("errorMessage");

    let tempData = [];

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const charity = document.getElementById("charityInput").value.trim();
        const hours = parseFloat(document.getElementById("hoursInput").value);
        const date = document.getElementById("dateInput").value;
        const rating = parseInt(document.getElementById("ratingInput").value);

        if (!charity || !hours || hours <= 0 || !date || rating < 1 || rating > 5) {
            errorMessage.textContent = "Please fill all fields correctly.";
            return;
        }

        errorMessage.textContent = "";

        const entry = { charity, hours, date, rating };
        tempData.push(entry);

        console.log("Temporary saved:", entry);
    });
});
