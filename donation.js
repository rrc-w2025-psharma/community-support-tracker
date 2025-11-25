function validateDonation() {
    const name = document.getElementById("charityName").value.trim();
    const amount = document.getElementById("donationAmount").value.trim();
    const date = document.getElementById("donationDate").value.trim();

    let errors = [];

    if (name === "") {
        errors.push("Charity name is required.");
    }

    if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
        errors.push("Donation amount must be a valid number.");
    }

    if (date === "") {
        errors.push("Donation date is required.");
    }

    document.getElementById("donationErrors").innerHTML = errors.join("<br>");

    return errors.length === 0;
}

document.getElementById("donationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (validateDonation()) {
        console.log("Form valid");
    }
});
