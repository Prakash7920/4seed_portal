const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwvrf98i4rL0atUtIRF1J6dtbS44EcQGnNehURdKYPmzltCYp9nvZc6dNjh6F0lGorI/exec";

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
            localStorage.setItem("admin", "true");
            window.location.href = "admin.html";
        } else {
            alert(data.message || "Invalid Username or Password");
            loginBtn.disabled = false;
            loginBtn.textContent = "Login";
        }
    })
    .catch(err => {
        console.error("Login error:", err);
        alert("An error occurred. Please try again later.");
        loginBtn.disabled = false;
        loginBtn.textContent = "Login";
    });
}
