const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzI7cDJDU1OwiM-OOrqX98wPJT6R05tIN1-UpZxdlGCEQJBlJmRxY0MvhvEkbUBFfpP/exec";

document.addEventListener("DOMContentLoaded", loadAnnouncements);

function loadAnnouncements() {

    fetch(WEB_APP_URL + "?action=getAnnouncements")
    .then(res => res.json())
    .then(data => {

        const list = document.getElementById("announcementList");
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = "<p>No announcements available.</p>";
            return;
        }

        data.reverse().forEach(item => {

            list.innerHTML += `
                <div class="announcement-card">
                    <h3>📢 ${item.title}</h3>
                    <small>${item.date}</small>
                    <p>${item.message}</p>
                </div>
            `;

        });

    })
    .catch(err => {

        console.error(err);

        document.getElementById("announcementList").innerHTML =
        "<p>Failed to load announcements.</p>";

    });

}
