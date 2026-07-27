const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwkCA8vAe3n17zpV4gaG8dMulvOibFdE7RckIr04NiiznjHwTMlEBIzb_7HsUuQ5Gpr/exec";

const partner = JSON.parse(localStorage.getItem("partner"));

fetch(WEB_APP_URL,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
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
