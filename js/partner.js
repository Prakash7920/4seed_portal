//======================================
// 4Seed Partners Management
// partners.js
//======================================

if(localStorage.getItem("admin")!="true"){

location.href="admin-login.html";

}

const WEB_APP_URL="YOUR_WEB_APP_URL";

let allPartners=[];

//========================
// Load Dashboard
//========================

window.onload=()=>{

loadDashboard();

loadPartners();

};

//========================
// Dashboard
//========================

function loadDashboard(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"getDashboardStats"

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

document.getElementById("totalPartners").textContent=data.total;

document.getElementById("activePartners").textContent=data.active;

document.getElementById("blockedPartners").textContent=data.blocked;

document.getElementById("todayPartners").textContent=data.today||0;

}

});

}

//========================
// Load Partners
//========================

function loadPartners(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"getAllPartners"

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

allPartners=data.partners;

renderPartners(allPartners);

}

});

}

//========================
// Render Table
//========================

function renderPartners(list){

const tbody=document.querySelector("#partnerTable tbody");

tbody.innerHTML="";

list.forEach(p=>{

tbody.innerHTML+=`

<tr>

<td>${p.partnerId}</td>

<td>${p.name}</td>

<td>${p.mobile}</td>

<td>${p.email}</td>

<td>₹${p.wallet}</td>

<td>${p.rank||"-"}</td>

<td>

<span class="${
p.status=="Active"
?
"status-active"
:
"status-blocked"
}">

${p.status}

</span>

</td>

<td>

<button
class="action-btn view-btn"
onclick="viewPartner('${p.partnerId}')">

<i class="fas fa-eye"></i>

</button>

<button
class="action-btn edit-btn"
onclick="editPartner('${p.partnerId}')">

<i class="fas fa-pen"></i>

</button>

<button
class="action-btn wallet-btn"
onclick="walletPopup('${p.partnerId}','${p.wallet}')">

<i class="fas fa-wallet"></i>

</button>

</td>

</tr>

`;

});

}

//========================
// Refresh
//========================

function refreshPartners(){

loadDashboard();

loadPartners();

}

//========================
// Search Partner
//========================

function searchPartner(){

const keyword=document
.getElementById("partnerSearch")
.value
.toLowerCase()
.trim();

const filtered=allPartners.filter(p=>{

return(

(p.partnerId||"")
.toLowerCase()
.includes(keyword)

||

(p.name||"")
.toLowerCase()
.includes(keyword)

||

(p.mobile||"")
.toLowerCase()
.includes(keyword)

||

(p.email||"")
.toLowerCase()
.includes(keyword)

);

});

renderPartners(filtered);

}

//========================
// View Partner
//========================

function viewPartner(partnerId){

const p=allPartners.find(x=>x.partnerId===partnerId);

if(!p)return;

document.getElementById("vPartnerId").textContent=p.partnerId;

document.getElementById("vName").textContent=p.name;

document.getElementById("vMobile").textContent=p.mobile;

document.getElementById("vEmail").textContent=p.email;

document.getElementById("vRank").textContent=p.rank||"-";

document.getElementById("vStatus").textContent=p.status;

document.getElementById("vWallet").textContent=p.wallet;

document.getElementById("vSponsor").textContent=p.sponsorId||"-";

document.getElementById("viewPopup").style.display="flex";

}

function closeViewPopup(){

document.getElementById("viewPopup").style.display="none";

}

//========================
// Edit Partner
//========================

function editPartner(partnerId){

const p=allPartners.find(x=>x.partnerId===partnerId);

if(!p)return;

document.getElementById("editPartnerId").value=p.partnerId;

document.getElementById("editName").value=p.name;

document.getElementById("editWallet").value=p.wallet;

document.getElementById("editStatus").value=p.status;

document.getElementById("editPopup").style.display="flex";

}

function closePopup(){

document.getElementById("editPopup").style.display="none";

}

//========================
// Save Partner
//========================

function savePartner(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"updatePartner",

partnerId:document.getElementById("editPartnerId").value,

name:document.getElementById("editName").value,

wallet:document.getElementById("editWallet").value,

status:document.getElementById("editStatus").value

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

alert("Partner updated successfully.");

closePopup();

refreshPartners();

}else{

alert("Update failed.");

}

});

}

//========================
// Export CSV
//========================

function exportPartners(){

let csv="Partner ID,Name,Mobile,Email,Wallet,Rank,Status\n";

allPartners.forEach(p=>{

csv+=`"${p.partnerId}","${p.name}","${p.mobile}","${p.email}","${p.wallet}","${p.rank||""}","${p.status}"\n`;

});

const blob=new Blob([csv],{

type:"text/csv"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="4Seed_Partners.csv";

a.click();

URL.revokeObjectURL(url);

}

//========================
// Logout
//========================

function logout(){

if(confirm("Logout from Admin Panel?")){

localStorage.removeItem("admin");

location.href="admin-login.html";

}

}
