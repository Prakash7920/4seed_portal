
// ================================
// 4Seed Portal API Service
// ================================

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbz2tVokoOFyFsjtYugYr8Ve6WUUkVCo50HpA5KJ8XaHcnFs9lYWuhHHXSPVTGEuz11M/exec";

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
