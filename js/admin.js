if(localStorage.getItem("admin")!="true"){

    location.href="admin-login.html";

}

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxC1UjRR9IjmwH8VviWNj9NGf0bO9uLdJ1JoBleiOwW9iYB_v-TadwvQEK0E5oDzqnA/exec";

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
   <td>${partner.rank || "No Rank"}</td>
   <td>${partner.status}</td>

            <td>
${partner.status}
<br>
<button onclick="toggleStatus('${partner.partnerId}','${partner.status}')">
${partner.status=="Active" ? "Block" : "Unblock"}
</button>
</td>

            <td>
    <button onclick="viewPartner('${partner.partnerId}')">👁 View</button>

    <button onclick="editPartner('${partner.partnerId}','${partner.name}','${partner.wallet}')">
        ✏️ Edit
    </button>

    <button onclick="walletPopup('${partner.partnerId}','${partner.wallet}')">
        💰 Wallet
    </button>
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

    fetch("https://script.google.com/macros/s/AKfycbxC1UjRR9IjmwH8VviWNj9NGf0bO9uLdJ1JoBleiOwW9iYB_v-TadwvQEK0E5oDzqnA/exec",{
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
function walletPopup(partnerId,wallet){

    document.getElementById("walletPartnerId").value = partnerId;
    document.getElementById("currentWallet").value = wallet;
    document.getElementById("walletPopup").style.display = "flex";

}

function closeWalletPopup(){

    document.getElementById("walletPopup").style.display = "none";

}

function updateWallet(){

    fetch(WEB_APP_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"updateWallet",
            partnerId:document.getElementById("walletPartnerId").value,
            amount:document.getElementById("walletAmountInput").value,
            type:document.getElementById("walletAction").value
        })
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){

            alert("Wallet Updated Successfully");

            closeWalletPopup();

            location.reload();

        }else{

            alert("Wallet Updated Failed");

        }

    });

}
function viewPartner(partnerId){

    const partner = allPartners.find(p => p.partnerId === partnerId);

    if(!partner) return;

    document.getElementById("vPartnerId").textContent = partner.partnerId;
    document.getElementById("vName").textContent = partner.name;
    document.getElementById("vMobile").textContent = partner.mobile;
    document.getElementById("vEmail").textContent = partner.email;
    document.getElementById("vStatus").textContent = partner.status;
    document.getElementById("vWallet").textContent = partner.wallet;

    document.getElementById("viewPopup").style.display = "flex";

}

function closeViewPopup(){

    document.getElementById("viewPopup").style.display = "none";

}
function sendAnnouncement(){

    fetch(WEB_APP_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"sendAnnouncement",
            title:document.getElementById("announcementTitle").value,
            message:document.getElementById("announcementMessage").value
        })
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){

            alert("Announcement Published");

            document.getElementById("announcementTitle").value="";
            document.getElementById("announcementMessage").value="";

        }

    });

}
fetch(WEB_APP_URL,{
    method:"POST",
    body:JSON.stringify({
        action:"getTeamTree"
    })
})
.then(res=>res.json())
.then(data=>{
    if(data.success){
        loadTeamTree(data.partners);
    }
});

function loadTeamTree(partners){

    const tree = document.getElementById("teamTree");
    tree.innerHTML = "";

    partners.forEach(p=>{

        tree.innerHTML += `
        <div class="tree-node">
            <strong>${p.partnerId}</strong><br>
            ${p.name}<br>
            Sponsor: ${p.sponsorId}
        </div>
        `;

    });

}
