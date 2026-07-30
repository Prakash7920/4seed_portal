
// ================================
// 4Seed Portal API Service
// ================================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycby0gIWVUif3O6Vl1x4ymG8oJMXSTuIHU42pKQDibdXukTfU5uZO5TzYjOIvSX1_kk9X/exec";

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
        body:JSON.stringify(data)

    });

    return await response.json();

}
