// ===============================
// AUTH GUARD
// ===============================

const partner = JSON.parse(localStorage.getItem("partner"));

if (!partner) {
    window.location.href = "login.html";
}
