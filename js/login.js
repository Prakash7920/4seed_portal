const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzwgy9llpVtRIX2KCiFEdmLp9yDqQQCaK4qqzeFmjN351tlu_BDP425Ry0Yfgg3BCcq/exec";

document
.getElementById("loginForm")
.addEventListener("submit", login);

async function login(e){

    e.preventDefault();

    const loginId = document.getElementById("loginId").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    console.log("=== Login Request ===");
    console.log("Login ID:", loginId);
    console.log("Password:", password);

    try{

        const response = await fetch("https://script.google.com/macros/s/AKfycbzwgy9llpVtRIX2KCiFEdmLp9yDqQQCaK4qqzeFmjN351tlu_BDP425Ry0Yfgg3BCcq/exec",{
            method:"POST",
            body:JSON.stringify({
                action:"login",
                loginId:loginId,
                password:password
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
