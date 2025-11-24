/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Import functions and tempSignups array
const { isValidEmail, tempSignups, initEventSignupForm } = require('./event-signup.js');

describe('isValidEmail', () => {
    test('valid emails return true', () => {
        expect(isValidEmail('test@example.com')).toBe(true);
        expect(isValidEmail('hello.world@domain.co')).toBe(true);
    });

    test('invalid emails return false', () => {
        expect(isValidEmail('invalid-email')).toBe(false);
        expect(isValidEmail('missing@domain')).toBe(false);
        expect(isValidEmail('')).toBe(false);
    });
});

describe('Event Signup Form', () => {
    let form, eventName, repName, repEmail, role, errorDiv, successDiv;

    beforeEach(() => {
        // Load HTML
        const html = fs.readFileSync(path.resolve(__dirname, './event-signup.html'), 'utf8');
        document.documentElement.innerHTML = html;

        // Initialize form JS
        initEventSignupForm();

        // Get references
        form = document.getElementById('eventSignupForm');
        eventName = document.getElementById('eventName');
        repName = document.getElementById('repName');
        repEmail = document.getElementById('repEmail');
        role = document.getElementById('role');
        errorDiv = document.getElementById('formErrors');
        successDiv = document.getElementById('formSuccess');

        // Reset tempSignups array
        tempSignups.length = 0;
    });

    test('shows error if fields are empty', () => {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        expect(errorDiv.innerHTML).toContain('Event Name is required');
        expect(errorDiv.innerHTML).toContain('Representative Name is required');
        expect(errorDiv.innerHTML).toContain('Email is required');
        expect(errorDiv.innerHTML).toContain('Role must be selected');
        expect(successDiv.innerHTML).toBe('');
        expect(tempSignups.length).toBe(0);
    });

    test('accepts valid input and stores in tempSignups', () => {
        eventName.value = 'Charity Gala';
        repName.value = 'Alice';
        repEmail.value = 'alice@test.com';
        role.value = 'participant';

        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        expect(successDiv.innerHTML).toBe('Signup successful!');
        expect(errorDiv.innerHTML).toBe('');
        expect(tempSignups.length).toBe(1);
        expect(tempSignups[0]).toEqual({
            eventName: 'Charity Gala',
            repName: 'Alice',
            repEmail: 'alice@test.com',
            role: 'participant'
        });
    });

    test('invalid email shows error', () => {
        eventName.value = 'Charity Gala';
        repName.value = 'Alice';
        repEmail.value = 'invalidemail';
        role.value = 'sponsor';

        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        expect(errorDiv.innerHTML).toContain('Email format is invalid');
        expect(successDiv.innerHTML).toBe('');
        expect(tempSignups.length).toBe(0);
    });
});
