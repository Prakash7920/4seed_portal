alert("admin-login.js loaded");
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx_y7TYGA-qICmgj4zBCBGa3QGvmjSKqBaxbgoFfdJAdScFvwMnzFhR2xxi0D0VkbQ/exec";

function adminLogin() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate inputs
    if (!username || !password) {
        alert("Please enter both username and password");
        return;
    }

    // Disable button to prevent multiple submissions
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.disabled = true;
    loginBtn.textContent = "Logging in...";

    fetch(WEB_APP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: "adminLogin",
            username: username,
            password: password
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        alert(JSON.stringify(data));
        if (data.success) {
            localStorage.setItem("admin", JSON.stringify(data));
            window.location.href = "admin.html";
        } else {
            alert(data.message || "Invalid Username or Password");
            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error: " + err.message);
        loginBtn.disabled = false;
        loginBtn.textContent = "Login";
    });
}
