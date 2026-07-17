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

    localStorage.removeItem("partner");

    window.location.href = "login.html";

});
document.getElementById("logoutBtn").addEventListener("click", function () {

    if (confirm("Are you sure you want to logout?")) {

    localStorage.removeItem("partner");

    window.location.href = "login.html";

    }
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

function animateValue(id, endValue) {

    let start = 0;

    const element = document.getElementById(id);

    const timer = setInterval(() => {

        start++;

        element.textContent = start;

        if (start >= endValue) {

            clearInterval(timer);

        }

    }, 30);

}

animateValue("teamCount", 0);
