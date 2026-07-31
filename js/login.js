// ===============================
// Show / Hide Password
// ===============================

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.innerHTML = "🙈";
    } else {
        password.type = "password";
        togglePassword.innerHTML = "👁";
    }

});

// ===============================
// Google Apps Script URL
// ===============================

const WEB_APP_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";

// ===============================
// Login
// ===============================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const partnerId = document.getElementById("partnerId").value.trim();
    const passwordValue = document.getElementById("password").value;

    const loginBtn = document.querySelector(".login-btn");

    loginBtn.disabled = true;
    loginBtn.innerHTML = "Logging in...";

    try {

        const response = await fetch(WEB_APP_URL, {

            method: "POST",

            body: JSON.stringify({

                action: "login",

                partnerId: partnerId,

                password: passwordValue

            })

        });

        const result = await response.json();

        if (result.status === "success") {

            loginBtn.innerHTML = "Login Successful";

            setTimeout(() => {

                if (result.role === "admin") {

                    window.location.href = "admin-dashboard.html";

                } else {

                    window.location.href = "dashboard.html";

                }

            }, 1000);

        } else {

            alert(result.message || "Invalid Partner ID or Password");

            loginBtn.disabled = false;
            loginBtn.innerHTML = "Login Securely";

        }

    } catch (err) {

        alert("Unable to connect to server.");

        console.error(err);

        loginBtn.disabled = false;
        loginBtn.innerHTML = "Login Securely";

    }

});
