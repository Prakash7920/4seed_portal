const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzo36Z1_t1_dzpEPd4tNWv7vZjRv9zcGOLvNf5m048Yy1CY_A29JtZqZDQhx5lYqNbV/exec";

const partner = JSON.parse(localStorage.getItem("partner"));

const referralLink =
"https://4seed.in/register.html?ref=" + partner.partnerId;

// Set referral link
document.getElementById("referralLink").value = referralLink;

// Generate QR Code
new QRCode(document.getElementById("qrcode"), {
    text: referralLink,
    width: 180,
    height: 180
});

// Load Referral Data
loadReferral();

function loadReferral(){

    fetch(WEB_APP_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            action:"getReferral",
            partnerId:partner.partnerId
        })
    })
    .then(res=>res.json())
    .then(data=>{

        document.getElementById("totalReferrals").innerHTML =
        data.totalReferrals;

        let html="";

        if(data.members.length===0){

            html=`
            <tr>
                <td colspan="5">
                    No Referral Found
                </td>
            </tr>
            `;

        }else{

            data.members.forEach(member=>{

                let status =
                member.status=="Active"
                ? "🟢 Active"
                : "🔴 Inactive";

                html+=`
                <tr>

                    <td>${member.partnerId}</td>

                    <td>${member.name}</td>

                    <td>${member.mobile}</td>

                    <td>${member.rank}</td>

                    <td>${status}</td>

                </tr>
                `;

            });

        }

        document.getElementById("referralTable").innerHTML = html;

    })
    .catch(error=>{

        console.log(error);

        document.getElementById("referralTable").innerHTML=`
        <tr>
            <td colspan="5">
                Failed to Load Data
            </td>
        </tr>
        `;

    });

}

// Copy Referral Link
function copyReferral(){

    navigator.clipboard.writeText(referralLink);

    alert("Referral link copied successfully.");

}

// WhatsApp
function shareWhatsApp(){

    window.open(
        "https://wa.me/?text="+
        encodeURIComponent(
            "Join 4Seed using my referral link:\n\n"+referralLink
        )
    );

}

// Telegram
function shareTelegram(){

    window.open(
        "https://t.me/share/url?url="+
        encodeURIComponent(referralLink)+
        "&text="+
        encodeURIComponent("Join 4Seed")
    );

}

// Email
function shareEmail(){

    window.location.href=
    "mailto:?subject=Join 4Seed&body="+
    encodeURIComponent(
        "Register using my referral link:\n\n"+referralLink
    );

}
