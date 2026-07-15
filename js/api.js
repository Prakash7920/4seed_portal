
// ================================
// 4Seed Portal API Service
// ================================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbwXQTiDU524qzdmOGKSW5BACTFV1VWZOjNWF6U7GpvInjtfxo5M2gt6GVV3GI2OfLc/exec";

// Verify Sponsor
async function verifySponsor(sponsorId){

const res = await fetch(
WEB_APP_URL +
"?action=verifySponsor&sponsorId=" +
encodeURIComponent(sponsorId) +
"&t=" + Date.now()
);

return await res.json();

}

// Register Partner
async function registerPartner(data){

    const response = await fetch(WEB_APP_URL,{

        method:"POST",

        headers:{
            "Content-Type":"text/plain;charset=utf-8"
        },

        body:JSON.stringify(data)

    });

    return await response.json();

}
