const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxBIDQ3jgjaFYaMxyBWY5ngE5uzF2GOskYx1bcy0RtDa-kV5O8_-5c4lwIPP4eXq2WI/exec";

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
