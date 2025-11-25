document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("volunteerForm");
    const errorMessage = document.getElementById("errorMessage");
    const tableBody = document.querySelector("#volunteerTable tbody");
    const totalHoursDisplay = document.getElementById("totalHours");

    // Load existing logs from localStorage
    let logs = JSON.parse(localStorage.getItem("volunteerLogs")) || [];

    // Load table on page load
    refreshTable();
    updateTotalHours();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const charity = document.getElementById("charityInput").value.trim();
        const hours = parseFloat(document.getElementById("hoursInput").value);
        const date = document.getElementById("dateInput").value;
        const rating = parseInt(document.getElementById("ratingInput").value);

        // Validation
        if (!charity || !hours || hours <= 0 || !date || rating < 1 || rating > 5) {
            errorMessage.textContent = "Please fill all fields correctly.";
            return;
        }

        errorMessage.textContent = "";

        const entry = { charity, hours, date, rating };
        logs.push(entry);

        // Save to localStorage
        localStorage.setItem("volunteerLogs", JSON.stringify(logs));

        refreshTable();
        updateTotalHours();

        form.reset();
    });

    function refreshTable() {
        tableBody.innerHTML = "";
        logs.forEach((entry, index) => addRow(entry, index));
        attachDeleteEvents();
    }

    function addRow(entry, index) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.charity}</td>
            <td>${entry.hours}</td>
            <td>${entry.date}</td>
            <td>${entry.rating}</td>
            <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
        `;

        tableBody.appendChild(row);
    }

    function attachDeleteEvents() {
        document.querySelectorAll(".deleteBtn").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                logs.splice(index, 1);
                localStorage.setItem("volunteerLogs", JSON.stringify(logs));
                refreshTable();
                updateTotalHours();
            });
        });
    }

    function updateTotalHours() {
        const total = logs.reduce((sum, entry) => sum + entry.hours, 0);
        totalHoursDisplay.textContent = total;
    }

});
