// script.js

// Function to open Signup Modal
function openSignup() {
    document.getElementById("signupModal").style.display = "block";
}

// Function to close Signup Modal
function closeSignup() {
    document.getElementById("signupModal").style.display = "none";
}

// Function for Sign-Up
function signup() {
    const signupEmail = document.getElementById("signupEmail").value;
    const signupUsername = document.getElementById("signupUsername").value;
    const signupPassword = document.getElementById("signupPassword").value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(signupEmail)) {
        document.getElementById("signupEmailWarning").style.display = "block";
    } else {
        document.getElementById("signupEmailWarning").style.display = "none";
    }

    if (!passwordRegex.test(signupPassword)) {
        document.getElementById("signupPasswordWarning").style.display = "block";
    } else {
        document.getElementById("signupPasswordWarning").style.display = "none";
    }

    if (emailRegex.test(signupEmail) && passwordRegex.test(signupPassword) && signupUsername) {
        localStorage.setItem("email", signupEmail);
        localStorage.setItem("username", signupUsername);
        localStorage.setItem("password", signupPassword);
        alert("Account created successfully!");
        closeSignup();
    } else {
        alert("Please fill all fields correctly.");
    }
}

// Function for Login
function login() {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const storedEmail = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
        document.getElementById("emailWarning").style.display = "block";
    } else {
        document.getElementById("emailWarning").style.display = "none";
    }

    if (!passwordRegex.test(password)) {
        document.getElementById("passwordWarning").style.display = "block";
    } else {
        document.getElementById("passwordWarning").style.display = "none";
    }

    if (emailRegex.test(email) && passwordRegex.test(password) && email === storedEmail && username === storedUsername && password === storedPassword) {
        // Redirect directly to another page after successful login
        window.location.href = "Mainpage.html"; // Change to your desired page
    } else {
        alert("Incorrect username, email, or password.");
    }
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById("signupModal")) {
        closeSignup();
    }
}
