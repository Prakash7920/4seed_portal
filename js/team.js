const partner = JSON.parse(localStorage.getItem("partner"));

if (!partner) {

    location.href = "login.html";

}

document.getElementById("myName").textContent = partner.name;

document.getElementById("myId").textContent =
"Partner ID : " + partner.partnerId;
