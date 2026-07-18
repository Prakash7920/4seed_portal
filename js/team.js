const partner = JSON.parse(localStorage.getItem("partner"));

if (!partner) {
    location.href = "login.html";
}

document.getElementById("myName").textContent = partner.name;
document.getElementById("myId").textContent =
"Partner ID : " + partner.partnerId;

// Load Team
fetch("https://script.google.com/macros/s/AKfycbw9P5iUDKYl3nXAaFfTdEO_rf7PfHSiLkwTjXq7HIpic7tOdg85aqIIeexbF63qrzIU/exec", {
    method: "POST",
    body: JSON.stringify({
        action: "getTeam",
        partnerId: partner.partnerId
    })
})
.then(res => res.json())
.then(data => {

    if (data.success) {

        document.getElementById("teamCount").textContent = data.team.length;

        for (let i = 0; i < 5; i++) {

            const slot = document.getElementById("slot" + (i + 1));

            if (data.team[i]) {

                slot.innerHTML = `
                    <b>${data.team[i].name}</b><br>
                    ${data.team[i].partnerId}
                `;

            } else {

                slot.innerHTML = "Empty";

            }

        }

    }

});
