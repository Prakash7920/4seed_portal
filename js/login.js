// ===============================
// Show / Hide Password
// ===============================

const togglePassword = document.getElementById("togglePassword");

const passwordField = document.getElementById("loginPassword");

if(togglePassword && passwordField){

    togglePassword.addEventListener("click", () => {

        if (passwordField.type === "password") {
            passwordField.type = "text";
            togglePassword.innerHTML = "🙈";
        } else {
            passwordField.type = "password";
            togglePassword.innerHTML = "👁";
        }

    });

}else{
    console.warn("Password toggle not initialized: #togglePassword or #loginPassword not found on this page.");
}

// ===============================
// Google Apps Script URL
// ===============================

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby0gIWVUif3O6Vl1x4ymG8oJMXSTuIHU42pKQDibdXukTfU5uZO5TzYjOIvSX1_kk9X/exec";

const loginForm = document.getElementById("loginForm");

if(loginForm){
    loginForm.addEventListener("submit", login);
}else{
    console.warn("Login form not initialized: #loginForm not found on this page.");
}

async function login(e){

    e.preventDefault();

    const loginIdEl = document.getElementById("loginId");
    const loginPasswordEl = document.getElementById("loginPassword");

    if(!loginIdEl || !loginPasswordEl){
        console.error("Login fields not found: check #loginId and #loginPassword exist in the HTML.");
        alert("Something went wrong. Please refresh the page and try again.");
        return;
    }

    const loginId = loginIdEl.value.trim();
    const loginPasswordValue = loginPasswordEl.value.trim();

    console.log("=== Login Request ===");
    console.log("Login ID:", loginId);
    // Password intentionally NOT logged for security reasons.

    try{

        const response = await fetch(WEB_APP_URL,{
            method:"POST",
            body:JSON.stringify({
                action:"login",
                loginId:loginId,
                password:loginPasswordValue
            })
        });

        console.log("HTTP Status:", response.status);

        const data = await response.json();

        console.log("Response:", data);

        if(data.status){

            console.log("✅ Login Success");

            localStorage.setItem("partner", JSON.stringify(data));
            localStorage.setItem("partnerId", data.partnerId);

            window.location.href="dashboard.html";

        }else{

            console.error("❌ Login Failed");
            console.error("Server Response:", data);

            alert("Invalid Partner ID or Password");

        }

    }catch(err){

        console.error("❌ Fetch Error:", err);
        alert(err.message);

    }

}
