const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzwgy9llpVtRIX2KCiFEdmLp9yDqQQCaK4qqzeFmjN351tlu_BDP425Ry0Yfgg3BCcq/exec";

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

    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({
            action: "changePassword",
            partnerId: partnerId,
            currentPassword: currentPassword,
            newPassword: newPassword
        })
    })
    .then(res => res.text())

    .then(msg => {

        alert(msg);

        if (msg.includes("success")) {

            window.location = "dashboard.html";

        }

    })

    .catch(err => {

        console.error(err);

        alert("Failed to change password.");

    });

}
