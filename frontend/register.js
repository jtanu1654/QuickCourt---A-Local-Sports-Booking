document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById('profile-icon');
    const profileUpload = document.getElementById('profile-upload');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const signupButton = document.getElementById('signupbutton');
    const fullnameError = document.getElementById('fullname-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    profileIcon.onclick = function() {
        profileUpload.click();
    };

    profileUpload.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) { // 1 MB
                alert('Image size must be less than 1 MB');
                event.target.value = '';
            } else {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileIcon.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    };

    function validatePassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,20}$/;
        return regex.test(password);
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    signupButton.onclick = function(e) {
        let valid = true;

        // Full Name validation
        if (!fullnameInput.value.trim()) {
            fullnameError.textContent = "Full Name is required.";
            valid = false;
        } else {
            fullnameError.textContent = "";
        }

        // Email validation
        if (!emailInput.value.trim()) {
            emailError.textContent = "Email is required.";
            valid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = "Enter a valid email address.";
            valid = false;
        } else {
            emailError.textContent = "";
        }

        // Password validation
        if (!validatePassword(passwordInput.value)) {
            passwordError.textContent = "Password must be 8-20 characters, include at least 1 uppercase letter, 1 number, and 1 special symbol (@ or #).";
            valid = false;
        } else {
            passwordError.textContent = "";
        }

        // Confirm Password validation
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
            valid = false;
        } else {
            confirmPasswordError.textContent = "";
        }

        if (!valid) {
            e.preventDefault();
        }
    };
});