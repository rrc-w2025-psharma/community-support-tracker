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

// Create temporary object for donation
function createDonationObject() {
    return {
        charity: document.getElementById("charityName").value.trim(),
        amount: Number(document.getElementById("donationAmount").value.trim()),
        date: document.getElementById("donationDate").value.trim(),
        comment: document.getElementById("donorComment").value.trim()
    };
}

// Submit handler
document.getElementById("donationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (validateDonation()) {
        const donation = createDonationObject();
        console.log("Temporary donation object:", donation);
    }
});