const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzo36Z1_t1_dzpEPd4tNWv7vZjRv9zcGOLvNf5m048Yy1CY_A29JtZqZDQhx5lYqNbV/exec";

const params = new URLSearchParams(window.location.search);

const partnerId = params.get("id");

fetch(WEB_APP_URL + "?action=verifyPartner&partnerId=" + partnerId)

.then(res => res.json())

.then(data => {

    const box = document.getElementById("verifyBox");

    if(!data.found){

        box.innerHTML = `
        <h2 style="color:red;">
        ❌ Invalid Partner
        </h2>`;

        return;
    }

    box.innerHTML = `
    <h2 style="color:green;">
    ✅ Verified Partner
    </h2>

    <p><b>Partner ID :</b> ${data.partnerId}</p>

    <p><b>Name :</b> ${data.name}</p>

    <p><b>Sponsor :</b> ${data.sponsor}</p>

    <p><b>Rank :</b> ${data.rank}</p>

    <p><b>Status :</b> ${data.status}</p>
    `;

});
