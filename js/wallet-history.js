const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxtg8NM_aQxAxw5IjsP5oeKsDe3qQbVpGLL2qk70HvPAvWF-5fKvhNYUox6Egsa29VJ/exec";

document.addEventListener("DOMContentLoaded", loadWalletHistory);

function loadWalletHistory() {

    const partnerId = localStorage.getItem("partnerId");

    fetch(WEB_APP_URL + "?action=getWalletHistory&partnerId=" + partnerId)
    .then(res => res.json())
    .then(data => {

        const tbody = document.querySelector("#walletTable tbody");
        tbody.innerHTML = "";

        if (data.length === 0) {

            tbody.innerHTML = `
            <tr>
                <td colspan="3">No wallet history found.</td>
            </tr>`;
            return;
        }

        data.forEach(item => {

            tbody.innerHTML += `
            <tr>
                <td>${new Date(item.date).toLocaleDateString()}</td>
                <td>${item.type}</td>
                <td>₹${item.amount}</td>
            </tr>`;
        });

    })
    .catch(err => {

        console.error(err);

        document.querySelector("#walletTable tbody").innerHTML = `
        <tr>
            <td colspan="3">Failed to load wallet history.</td>
        </tr>`;

    });

}
