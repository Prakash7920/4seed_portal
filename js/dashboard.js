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
document.getElementById("logoutBtn").addEventListener("click", function () {

    localStorage.removeItem("partner");

    window.location.href = "login.html";

});
document.getElementById("logoutBtn").addEventListener("click", function () {

    localStorage.removeItem("partner");

    window.location.href = "login.html";

});

// ====================================
// Dashboard Statistics
// ====================================

document.getElementById("welcomeTitle").innerHTML =
"Welcome, " + partner.name + " 👋";

document.getElementById("walletBalance").innerHTML = "₹0";

document.getElementById("teamCount").innerHTML = "0";

document.getElementById("businessVolume").innerHTML = "₹0";

document.getElementById("rankName").innerHTML = "Starter";
