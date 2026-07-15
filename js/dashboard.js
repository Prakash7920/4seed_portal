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
