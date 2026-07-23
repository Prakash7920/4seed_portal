const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzI7cDJDU1OwiM-OOrqX98wPJT6R05tIN1-UpZxdlGCEQJBlJmRxY0MvhvEkbUBFfpP/exec";

function changePassword() {

    const partnerId = localStorage.getItem("partnerId");

    const currentPassword =
        document.getElementById("currentPassword").value;

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

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
