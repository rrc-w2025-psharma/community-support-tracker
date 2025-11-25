document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("volunteerForm");
    const errorMessage = document.getElementById("errorMessage");
    const tableBody = document.querySelector("#volunteerTable tbody");

    let logs = JSON.parse(localStorage.getItem("volunteerLogs")) || [];
    loadTable();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const charity = document.getElementById("charityInput").value.trim();
        const hours = parseFloat(document.getElementById("hoursInput").value);
        const date = document.getElementById("dateInput").value;
        const rating = parseInt(document.getElementById("ratingInput").value);

        if (!charity || !hours || hours <= 0 || !date || rating < 1 || rating > 5) {
            errorMessage.textContent = "Please fill in all fields correctly.";
            return;
        }

        errorMessage.textContent = "";

        const entry = { charity, hours, date, rating };
        logs.push(entry);
        localStorage.setItem("volunteerLogs", JSON.stringify(logs));

        refreshTable();
    });

    function loadTable() {
        tableBody.innerHTML = "";
        logs.forEach((entry, index) => addRow(entry, index));
    }

    function refreshTable() {
        loadTable();
    }

    function addRow(entry, index) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.charity}</td>
            <td>${entry.hours}</td>
            <td>${entry.date}</td>
            <td>${entry.rating}</td>
            <td><button onclick="deleteEntry(${index})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    }

    window.deleteEntry = function(index) {
        logs.splice(index, 1);
        localStorage.setItem("volunteerLogs", JSON.stringify(logs));
        refreshTable();
    };

});
