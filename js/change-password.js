alert("JS Loaded");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyvup4tkTh_nlM3S1-GzzvYnIqPBzgpFlCLnOPuXzd6CB3Z-f2YuLD5RBQl2CUTLBE8/exec";

function changePassword() {
    const partner = JSON.parse(localStorage.getItem("partner"));

    if (!partner) {
        alert("Please login again.");
        return;
    }

    const partnerId = partner.partnerId;

    const currentPassword = document.getElementById("currentPassword").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    alert("Sending request...");

    fetch(WEB_APP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: "changePassword",
            partnerId: partnerId,
            currentPassword: currentPassword,
            newPassword: newPassword
        })
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        alert(result);
    })
    .catch(error => {
        console.error(error);
        alert(error.message);
    });
        }
