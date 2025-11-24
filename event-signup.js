// Temporary object to store form data
let tempSignups = [];

// Select form and message containers
const form = document.getElementById('eventSignupForm');
const errorDiv = document.getElementById('formErrors');
const successDiv = document.getElementById('formSuccess');

// Helper function to validate email
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// Form submit event
form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    // Clear previous messages
    errorDiv.innerHTML = '';
    successDiv.innerHTML = '';

    // Get values
    const eventName = document.getElementById('eventName').value.trim();
    const repName = document.getElementById('repName').value.trim();
    const repEmail = document.getElementById('repEmail').value.trim();
    const role = document.getElementById('role').value;

    // Validation
    let errors = [];
    if (!eventName) errors.push("Event Name is required.");
    if (!repName) errors.push("Representative Name is required.");
    if (!repEmail) {
        errors.push("Email is required.");
    } else if (!isValidEmail(repEmail)) {
        errors.push("Email format is invalid.");
    }
    if (!role) errors.push("Role must be selected.");

    // Show errors or store data
    if (errors.length > 0) {
        errorDiv.innerHTML = errors.join('<br>');
    } else {
        // Create object for this signup
        const signup = { eventName, repName, repEmail, role };

        // Add to temporary array
        tempSignups.push(signup);

        // Show success message and reset form
        successDiv.innerHTML = "Signup successful!";
        form.reset();

        // Check array in console
        console.log(tempSignups);
    }
});
