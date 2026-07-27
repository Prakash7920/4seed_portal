const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzo36Z1_t1_dzpEPd4tNWv7vZjRv9zcGOLvNf5m048Yy1CY_A29JtZqZDQhx5lYqNbV/exec";

const partner = JSON.parse(localStorage.getItem("partner"));

loadRank();

function loadRank() {

    fetch(WEB_APP_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: "getRankDetails",
            partnerId: partner.partnerId
        })
    })
    .then(res => res.json())
    .then(data => {

        if (!data.success) {
            alert(data.message);
            return;
        }

        // Current Rank
        document.getElementById("currentRank").innerHTML =
            data.partner.rank;

        // Team Statistics
        document.getElementById("directMembers").innerHTML =
            data.directMembers;

        document.getElementById("bronzeMembers").innerHTML =
            data.bronzeMembers;

        document.getElementById("silverMembers").innerHTML =
            data.silverMembers;

        document.getElementById("goldMembers").innerHTML =
            data.goldMembers;

        document.getElementById("diamondMembers").innerHTML =
            data.diamondMembers;

        // Wallet
        document.getElementById("releasedWallet").innerHTML =
            "₹" + data.partner.releasedWallet;

        document.getElementById("lockedWallet").innerHTML =
            "₹" + data.partner.lockedWallet;

        calculateProgress(data);

    })
    .catch(err => {

        console.log(err);

        alert("Failed to load rank details.");

    });

}
function calculateProgress(data){

    let percent = 0;

    switch(data.partner.rank){

        case "Starter":
            percent = (data.directMembers / 5) * 100;
            break;

        case "Bronze":
            percent = (data.bronzeMembers / 5) * 100;
            break;

        case "Silver":
            percent = (data.silverMembers / 5) * 100;
            break;

        case "Gold":
            percent = (data.goldMembers / 5) * 100;
            break;

        case "Diamond":
            percent = (data.diamondMembers / 5) * 100;
            break;

        default:
            percent = 100;

    }

    if(percent > 100)
        percent = 100;

    document.getElementById("rankProgress").value = percent;

    document.getElementById("progressText").innerHTML =
        Math.round(percent) + "% Completed";

}
