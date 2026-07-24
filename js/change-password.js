alert("JS Loaded");
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwvrf98i4rL0atUtIRF1J6dtbS44EcQGnNehURdKYPmzltCYp9nvZc6dNjh6F0lGorI/exec";

function changePassword() {

    alert(localStorage.getItem("partnerId"));
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
