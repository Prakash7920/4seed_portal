const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzo36Z1_t1_dzpEPd4tNWv7vZjRv9zcGOLvNf5m048Yy1CY_A29JtZqZDQhx5lYqNbV/exec";

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
