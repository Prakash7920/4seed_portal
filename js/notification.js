const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzo36Z1_t1_dzpEPd4tNWv7vZjRv9zcGOLvNf5m048Yy1CY_A29JtZqZDQhx5lYqNbV/exec";

const partner = JSON.parse(localStorage.getItem("partner"));

fetch(WEB_APP_URL,{
    method:"POST",
    body:JSON.stringify({
        action:"getNotifications",
        partnerId:partner.partnerId
    })
})
.then(res=>res.json())
.then(data=>{

    let html="";

    data.notifications.forEach(n=>{

        html+=`
        <tr>
            <td>${n.date}</td>
            <td>${n.title}</td>
            <td>${n.message}</td>
            <td>${n.status}</td>
        </tr>
        `;

    });

    document.getElementById("notificationTable").innerHTML=html;

});
fetch(WEB_APP_URL,{
    method:"POST",
    body:JSON.stringify({
        action:"markNotificationsRead",
        partnerId:partner.partnerId
    })
});
