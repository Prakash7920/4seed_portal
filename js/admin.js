const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw9P5iUDKYl3nXAaFfTdEO_rf7PfHSiLkwTjXq7HIpic7tOdg85aqIIeexbF63qrzIU/exec";

fetch("https://script.google.com/macros/s/AKfycbw9P5iUDKYl3nXAaFfTdEO_rf7PfHSiLkwTjXq7HIpic7tOdg85aqIIeexbF63qrzIU/exec",{
    method:"POST",
    body:JSON.stringify({
        action:"getAllPartners"
    })
})
.then(res=>res.json())
.then(data=>{

    if(data.success){

        loadPartners(data.partners);

    }

});
function loadPartners(partners){

    const tbody = document.querySelector("#partnerTable tbody");

    tbody.innerHTML = "";

    partners.forEach(partner=>{

        tbody.innerHTML += `
        <tr>

            <td>${partner.partnerId}</td>

            <td>${partner.name}</td>

            <td>₹${partner.wallet}</td>

            <td>${partner.status}</td>

            <td>
                <button onclick="editPartner('${partner.partnerId}','${partner.name}','${partner.wallet}')">
Edit</button>
            </td>

        </tr>
        `;

    });

}
