
//==========================================
// 4Seed Genealogy
// genealogy.js
//==========================================

if(localStorage.getItem("admin")!="true"){

location.href="admin-login.html";

}

const WEB_APP_URL="https://script.google.com/macros/s/AKfycby0gIWVUif3O6Vl1x4ymG8oJMXSTuIHU42pKQDibdXukTfU5uZO5TzYjOIvSX1_kk9X/exec";

let genealogyData=[];

//==========================================
// Page Load
//==========================================

window.onload=()=>{

loadTree();

};

//==========================================
// Load Genealogy
//==========================================

function loadTree(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"getGenealogy"

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

genealogyData=data.tree;

renderTree(genealogyData);

}else{

document.getElementById("genealogyTree").innerHTML=

"<h3>No Data Found</h3>";

}

})

.catch(err=>{

console.error(err);

document.getElementById("genealogyTree").innerHTML=

"<h3>Unable to Load Tree</h3>";

});

}

//==========================================
// Render Tree
//==========================================

function renderTree(list){

const container=document.getElementById("genealogyTree");

container.innerHTML="";

list.forEach(member=>{

container.innerHTML+=`

<div class="tree-node">

<div class="tree-card">

<h3>${member.name}</h3>

<p>${member.partnerId}</p>

<span>${member.rank||"Member"}</span>

<div class="tree-actions">

<button
class="primary-btn"
onclick="viewPartner('${member.partnerId}')">

View

</button>

<button
class="primary-btn"
onclick="showChildren('${member.partnerId}')">

Downline

</button>

</div>

</div>

</div>

`;

});

}

//==========================================
// Refresh
//==========================================

function refreshTree(){

loadTree();

}
//==========================================
// Search Partner
//==========================================

function searchTree(){

const keyword=document
.getElementById("partnerSearch")
.value
.toLowerCase()
.trim();

if(keyword===""){

renderTree(genealogyData);

return;

}

const filtered=genealogyData.filter(item=>

(item.partnerId||"")
.toLowerCase()
.includes(keyword)

||

(item.name||"")
.toLowerCase()
.includes(keyword)

);

renderTree(filtered);

}

//==========================================
// View Partner
//==========================================

function viewPartner(partnerId){

const member=genealogyData.find(x=>x.partnerId===partnerId);

if(!member) return;

document.getElementById("treeName").innerHTML=member.name;

document.getElementById("treePartnerId").innerHTML=member.partnerId;

document.getElementById("treeSponsorId").innerHTML=member.sponsorId||"-";

document.getElementById("treeRank").innerHTML=member.rank||"Member";

document.getElementById("treeWallet").innerHTML=member.wallet||0;

document.getElementById("treeStatus").innerHTML=member.status||"Active";

document.getElementById("treeMobile").innerHTML=member.mobile||"-";

document.getElementById("treeEmail").innerHTML=member.email||"-";

document.getElementById("treeDirect").innerHTML=member.directCount||0;

document.getElementById("treeTeam").innerHTML=member.teamCount||0;

document.getElementById("partnerPopup").style.display="flex";

}

//==========================================
// Close Popup
//==========================================

function closePartnerPopup(){

document.getElementById("partnerPopup").style.display="none";

}

//==========================================
// Show Downline
//==========================================

function showChildren(partnerId){

const children=genealogyData.filter(item=>

item.sponsorId===partnerId

);

const container=document.getElementById("genealogyTree");

if(children.length===0){

alert("No downline found.");

return;

}

container.innerHTML="";

children.forEach(member=>{

container.innerHTML+=`

<div class="tree-node">

<div class="tree-card">

<h3>${member.name}</h3>

<p>${member.partnerId}</p>

<span>${member.rank||"Member"}</span>

<div class="tree-actions">

<button
class="primary-btn"
onclick="viewPartner('${member.partnerId}')">

View

</button>

<button
class="primary-btn"
onclick="showChildren('${member.partnerId}')">

Downline

</button>

</div>

</div>

</div>

`;

});

}

//==========================================
// Back to Root Tree
//==========================================

function showRootTree(){

renderTree(genealogyData);

}

//==========================================
// Logout
//==========================================

function logout(){

if(confirm("Logout from Admin Panel?")){

localStorage.removeItem("admin");

location.href="admin-login.html";

}

}

//==========================================
// Auto Refresh
//==========================================

setInterval(()=>{

loadTree();

},60000);
