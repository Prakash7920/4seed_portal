const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzYQ7dsEoSOecNUQHfNg4yhxAASxC0GWYwXQ28EvICRA6tv-Dxbe2qu9gJSIZ7p3mb4/exec";

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
