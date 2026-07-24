const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwvrf98i4rL0atUtIRF1J6dtbS44EcQGnNehURdKYPmzltCYp9nvZc6dNjh6F0lGorI/exec";
const partner = JSON.parse(localStorage.getItem("partner"));

if (!partner) {
    window.location.href = "login.html";
}

document.getElementById("partnerName").textContent =
    partner.name;

document.getElementById("partnerId").textContent =
    partner.partnerId;

document.getElementById("sponsorName").textContent =
    partner.sponsorName;

// Welcome Message
document.getElementById("welcomeTitle").textContent =
"Welcome Back, " + partner.name + " 👋";

document.getElementById("logoutBtn").addEventListener("click", function () {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("partner");

        window.location.href = "login.html";

    }
});

function openWithdraw(){

    document.getElementById("withdrawPopup").style.display="flex";

}

function closeWithdraw(){

    document.getElementById("withdrawPopup").style.display="none";

}

function sendWithdrawRequest(){

    const amount = document.getElementById("withdrawAmount").value;

    if(amount=="" || Number(amount)<=0){
        alert("Enter a valid amount");
        return;
    }

    fetch("https://script.google.com/macros/s/AKfycbwvrf98i4rL0atUtIRF1J6dtbS44EcQGnNehURdKYPmzltCYp9nvZc6dNjh6F0lGorI/exec",{
        method:"POST",
        body:JSON.stringify({
            action:"withdrawRequest",
            partnerId:partner.partnerId,
            name:partner.name,
            amount:amount
        })
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){
            alert("Withdrawal request submitted successfully.");
            closeWithdraw();
            document.getElementById("withdrawAmount").value="";
        }else{
            alert(data.message || "Submission failed");
        }

    })
    .catch(error=>{
        console.log(error);
        alert("Network Error");
    });

}

// ====================================
// Dashboard Statistics
// ====================================

document.getElementById("walletBalance").innerHTML = "₹0";

document.getElementById("businessVolume").innerHTML = "₹0";

document.getElementById("rankName").innerHTML = "Starter";

fetch(WEB_APP_URL,{
    method: "POST",
    body: JSON.stringify({
        action: "getTeam",
        partnerId: partner.partnerId
    })
})
.then(res => res.json())
.then(data => {

    if (data.success) {

        document.getElementById("teamCount").textContent =
            data.team.length;

    }

})
.catch(error => console.log(error));
