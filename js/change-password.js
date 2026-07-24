alert("JS Loaded");
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyvup4tkTh_nlM3S1-GzzvYnIqPBzgpFlCLnOPuXzd6CB3Z-f2YuLD5RBQl2CUTLBE8/exec";

function changePassword() {

    alert(localStorage.getItem("partnerId"));
    const partner = JSON.parse(localStorage.getItem("partner"));
    const partnerId = partner.partnerId;
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
.then(async (res) => {
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text);
    alert(text);
})
.catch((err) => {
    console.error(err);
    alert(err.message);
});
