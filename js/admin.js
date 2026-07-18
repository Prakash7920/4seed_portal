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

fetch("https://script.google.com/macros/s/AKfycbw9P5iUDKYl3nXAaFfTdEO_rf7PfHSiLkwTjXq7HIpic7tOdg85aqIIeexbF63qrzIU/exec",{
    method:"POST",
    body:JSON.stringify({
        action:"getDashboardStats"
    })
})
.then(res=>res.json())
.then(data=>{

    if(data.success){

        document.getElementById("totalPartners").textContent = data.total;
        document.getElementById("activePartners").textContent = data.active;
        document.getElementById("blockedPartners").textContent = data.blocked;
        document.getElementById("walletAmount").textContent = "₹" + data.wallet;

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
function editPartner(id,name,wallet){

    document.getElementById("editPartnerId").value=id;
    document.getElementById("editName").value=name;
    document.getElementById("editWallet").value=wallet;

    document.getElementById("editPopup").style.display="flex";

}

function closePopup(){

    document.getElementById("editPopup").style.display="none";

}
function savePartner(){

    fetch("https://script.google.com/macros/s/AKfycbw9P5iUDKYl3nXAaFfTdEO_rf7PfHSiLkwTjXq7HIpic7tOdg85aqIIeexbF63qrzIU/exec",{
        method:"POST",
        body:JSON.stringify({

            action:"updatePartner",

            partnerId:document.getElementById("editPartnerId").value,

            name:document.getElementById("editName").value,

            wallet:document.getElementById("editWallet").value

        })
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){

            alert("Partner Updated Successfully");

            closePopup();

            location.reload();

        }else{

            alert("Update Failed");

        }

    });

}
