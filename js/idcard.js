const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzI7cDJDU1OwiM-OOrqX98wPJT6R05tIN1-UpZxdlGCEQJBlJmRxY0MvhvEkbUBFfpP/exec";

document.addEventListener("DOMContentLoaded", loadIdCard);

function loadIdCard(){

    const partnerId = localStorage.getItem("partnerId");

    fetch(WEB_APP_URL + "?action=getIdCard&partnerId=" + partnerId)

    .then(res=>res.json())

    .then(data=>{

        document.getElementById("partnerId").textContent =
        data.partnerId;

        document.getElementById("partnerName").textContent =
        data.name;

        document.getElementById("sponsorName").textContent =
        data.sponsor;

        document.getElementById("rank").textContent =
        data.rank;

        document.getElementById("status").textContent =
        data.status;

        const verifyURL =
        "https://4seed.in/verify.html?id=" +
        data.partnerId;

        new QRCode(document.getElementById("qrcode"),{

            text: verifyURL,

            width:150,

            height:150

        });

    })

    .catch(err=>{

        console.error(err);

        alert("Unable to load ID Card.");

    });

}
