const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzI7cDJDU1OwiM-OOrqX98wPJT6R05tIN1-UpZxdlGCEQJBlJmRxY0MvhvEkbUBFfpP/exec";

document.addEventListener("DOMContentLoaded", loadProfile);

function loadProfile() {

    const partnerId = localStorage.getItem("partnerId");

    fetch(WEB_APP_URL + "?action=getProfile&partnerId=" + partnerId)
        .then(res => res.json())
        .then(data => {

            document.getElementById("partnerId").value = data.partnerId || "";
            document.getElementById("sponsorId").value = data.sponsorId || "";
            document.getElementById("sponsorName").value = data.sponsorName || "";
            document.getElementById("name").value = data.name || "";
            document.getElementById("mobile").value = data.mobile || "";
            document.getElementById("email").value = data.email || "";
            document.getElementById("address").value = data.address || "";

        })
        .catch(err => {
            console.error(err);
            alert("Failed to load profile.");
        });

}

function updateProfile() {

    const profile = {

        action: "updateProfile",
        partnerId: document.getElementById("partnerId").value,
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value

    };

    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(profile)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
    })
    .catch(err => {
        console.error(err);
        alert("Profile update failed.");
    });

}
