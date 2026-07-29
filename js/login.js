const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz2tVokoOFyFsjtYugYr8Ve6WUUkVCo50HpA5KJ8XaHcnFs9lYWuhHHXSPVTGEuz11M/exec";

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

        const response = await fetch(WEB_APP_URL,{
            method:"POST",
            body:JSON.stringify({
                action:"login",
                loginId:loginId,
                password:password
            })
        });

        console.log("HTTP Status:", response.status);

        const data = await response.json();

        console.log("API Response:", data);

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
