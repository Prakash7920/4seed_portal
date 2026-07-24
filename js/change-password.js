alert("changePassword called");
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyhJYsJKQCjkIOynAF1cXBFbxtaFK4cLnWRBCTurRGZTv9GG2AaX2Vh8M4Pj6ghPdrD/exec";

function changePassword() {

    const partnerId = localStorage.getItem("partnerId");
    alert("Partner ID: " + partnerId);
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
    
    alert("Sending request...");
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
    alert("Error: " + err.message);
});
