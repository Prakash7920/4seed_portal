if(localStorage.getItem("admin")!="true"){

    location.href="admin-login.html";

}

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwhub93htUz8GehM7tbfugo0YejhohT2j-Dx3M7mOn6aqzvuq8YBc2OOdD_wmJCyGRe/exec";

let allPartners = [];

fetch(WEB_APP_URL,{
    method:"POST",
    body:JSON.stringify({
        action:"getAllPartners"
    })
})
.then(res=>res.json())
.then(data=>{

    if(data.success){

    allPartners = data.partners;

    loadPartners(allPartners);

    }

});

fetch(WEB_APP_URL,{
    method:"POST",
    body:JSON.stringify({
        action:"getDashboardStats"
    })
})
.then(res=>res.json())
.then(data=>{

    if(data.success){

        document.getElementById("totalPartners").textContent = data.total;
        document.getElementById("activePartners").textContent = data.active;
        document.getElementById("blockedPartners").textContent = data.blocked;
        document.getElementById("walletAmount").textContent = "₹" + data.wallet;

    }

});

fetch(WEB_APP_URL,{
    method:"POST",
    body:JSON.stringify({
        action:"getWithdrawRequests"
    })
})
.then(res=>res.json())
.then(data=>{

    if(data.success){

        loadWithdrawRequests(data.requests);

    }

});

function loadPartners(partners){

    const tbody = document.querySelector("#partnerTable tbody");

    tbody.innerHTML = "";

    partners.forEach(partner=>{

        tbody.innerHTML += `
        <tr>

            <td>${partner.partnerId}</td>

            <td>${partner.name}</td>

            <td>₹${partner.wallet}</td>

            <td>
${partner.status}
<br>
<button onclick="toggleStatus('${partner.partnerId}','${partner.status}')">
${partner.status=="Active" ? "Block" : "Unblock"}
</button>
</td>

            <td>
                <button onclick="editPartner('${partner.partnerId}','${partner.name}','${partner.wallet}')">
Edit</button>
            </td>

        </tr>
        `;

    });

}
function editPartner(id,name,wallet){

    document.getElementById("editPartnerId").value=id;
    document.getElementById("editName").value=name;
    document.getElementById("editWallet").value=wallet;

    document.getElementById("editPopup").style.display="flex";

}

function closePopup(){

    document.getElementById("editPopup").style.display="none";

}
function savePartner(){

    fetch("https://script.google.com/macros/s/AKfycbwhub93htUz8GehM7tbfugo0YejhohT2j-Dx3M7mOn6aqzvuq8YBc2OOdD_wmJCyGRe/exec",{
        method:"POST",
        body:JSON.stringify({

            action:"updatePartner",

            partnerId:document.getElementById("editPartnerId").value,

            name:document.getElementById("editName").value,

            wallet:document.getElementById("editWallet").value

        })
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){

            alert("Partner Updated Successfully");

            closePopup();

fetch(WEB_APP_URL,{
    method:"POST",
    body:JSON.stringify({
        action:"getAllPartners"
    })
})
.then(res=>res.json())
.then(data=>{
    if(data.success){
        loadPartners(data.partners);
    }
});

        }else{

            alert("Update Failed");

        }

    });

}

function searchPartner(){

    const keyword = document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    const filtered = allPartners.filter(partner =>

        partner.partnerId.toLowerCase().includes(keyword) ||

        partner.name.toLowerCase().includes(keyword)

    );

    loadPartners(filtered);

}

function toggleStatus(partnerId,status){

    fetch(WEB_APP_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"toggleStatus",
            partnerId:partnerId
        })
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){

            fetch(WEB_APP_URL,{
                method:"POST",
                body:JSON.stringify({
                    action:"getAllPartners"
                })
            })
            .then(res=>res.json())
            .then(data=>{

                allPartners = data.partners;
                loadPartners(allPartners);

            });

        }

    });

}

function loadWithdrawRequests(requests){

    const tbody=document.querySelector("#withdrawTable tbody");

    tbody.innerHTML="";

    requests.forEach(req=>{

        tbody.innerHTML += `
        <tr>

            <td>${req.requestId}</td>

            <td>${req.partnerId}</td>

            <td>${req.name}</td>

            <td>₹${req.amount}</td>

            <td>${req.status}</td>

            <td>

                <button onclick="approveWithdraw('${req.requestId}')">
                    ✅ Approve
                </button>

                <button onclick="rejectWithdraw('${req.requestId}')">
                    ❌ Reject
                </button>

            </td>

        </tr>
        `;

    });

}
function approveWithdraw(requestId){

    fetch(WEB_APP_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"approveWithdraw",
            requestId:requestId
        })
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){

            alert("Withdrawal Approved");

            location.reload();

        }

    });

}
function rejectWithdraw(requestId){

    fetch(WEB_APP_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"rejectWithdraw",
            requestId:requestId
        })
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){

            alert("Withdrawal Rejected");

            location.reload();

        }

    });

}

function logout(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("admin");

        location.href = "admin-login.html";

    }

}
