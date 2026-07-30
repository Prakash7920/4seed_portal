//==========================================
// 4Seed Wallet Management
// wallet.js
//==========================================

if(localStorage.getItem("admin")!="true"){

location.href="admin-login.html";

}

const WEB_APP_URL="YOUR_WEB_APP_URL";

let walletData=[];

//==========================================
// Page Load
//==========================================

window.onload=()=>{

loadWallet();

loadWalletSummary();

};

//==========================================
// Wallet Summary
//==========================================

function loadWalletSummary(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"getWalletSummary"

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

document.getElementById("totalWallet").innerHTML="₹"+data.totalWallet;

document.getElementById("creditToday").innerHTML="₹"+data.creditToday;

document.getElementById("debitToday").innerHTML="₹"+data.debitToday;

document.getElementById("pendingWallet").innerHTML=data.pending;

}

});

}

//==========================================
// Wallet List
//==========================================

function loadWallet(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"getWalletList"

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

walletData=data.wallets;

renderWallet(walletData);

}

});

}

//==========================================
// Render Wallet Table
//==========================================

function renderWallet(list){

const tbody=document.querySelector("#walletTable tbody");

tbody.innerHTML="";

list.forEach(item=>{

tbody.innerHTML+=`

<tr>

<td>${item.partnerId}</td>

<td>${item.name}</td>

<td>₹${item.wallet}</td>

<td style="color:green;">

₹${item.credit||0}

</td>

<td style="color:red;">

₹${item.debit||0}

</td>

<td>

${item.updatedBy||"Admin"}

</td>

<td>

${item.date||"-"}

</td>

<td>

<button
class="action-btn wallet-btn"
onclick="walletPopup(

'${item.partnerId}',

'${item.name}',

'${item.wallet}'

)">

<i class="fas fa-wallet"></i>

</button>

<button
class="action-btn view-btn"
onclick="walletHistory(

'${item.partnerId}'

)">

<i class="fas fa-clock-rotate-left"></i>

</button>

</td>

</tr>

`;

});

}

//==========================================
// Refresh
//==========================================

function refreshWallet(){

loadWalletSummary();

loadWallet();

}
//==========================================
// Search Wallet
//==========================================

function searchWallet(){

const keyword=document
.getElementById("walletSearch")
.value
.toLowerCase()
.trim();

const filtered=walletData.filter(item=>{

return(

(item.partnerId||"")
.toLowerCase()
.includes(keyword)

||

(item.name||"")
.toLowerCase()
.includes(keyword)

);

});

renderWallet(filtered);

}

//==========================================
// Open Wallet Popup
//==========================================

function walletPopup(partnerId,name,wallet){

document.getElementById("walletPartnerId").value=partnerId;

document.getElementById("walletPartner").value=partnerId;

document.getElementById("walletName").value=name;

document.getElementById("currentWallet").value=wallet;

document.getElementById("walletAmountInput").value="";

document.getElementById("walletRemarks").value="";

document.getElementById("walletPopup").style.display="flex";

}

function closeWalletPopup(){

document.getElementById("walletPopup").style.display="none";

}

//==========================================
// Update Wallet
//==========================================

function updateWallet(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"updateWallet",

partnerId:document.getElementById("walletPartnerId").value,

amount:document.getElementById("walletAmountInput").value,

type:document.getElementById("walletAction").value,

remarks:document.getElementById("walletRemarks").value

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

alert("Wallet updated successfully.");

closeWalletPopup();

refreshWallet();

}else{

alert("Wallet update failed.");

}

});

}

//==========================================
// Wallet History
//==========================================

function walletHistory(partnerId){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"getWalletHistory",

partnerId:partnerId

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

const tbody=document.querySelector("#historyTable tbody");

tbody.innerHTML="";

data.history.forEach(h=>{

tbody.innerHTML+=`

<tr>

<td>${h.date}</td>

<td>${h.type}</td>

<td>₹${h.amount}</td>

<td>₹${h.balance}</td>

<td>${h.remarks||"-"}</td>

<td>${h.updatedBy||"Admin"}</td>

</tr>

`;

});

document.getElementById("historyPopup").style.display="flex";

}

});

}

function closeHistoryPopup(){

document.getElementById("historyPopup").style.display="none";

}

//==========================================
// Export CSV
//==========================================

function exportWallet(){

let csv="Partner ID,Name,Wallet,Credit,Debit,Updated By,Date\n";

walletData.forEach(item=>{

csv+=`"${item.partnerId}","${item.name}","${item.wallet}","${item.credit||0}","${item.debit||0}","${item.updatedBy||"Admin"}","${item.date||""}"\n`;

});

const blob=new Blob([csv],{

type:"text/csv"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="4Seed_Wallet_Report.csv";

a.click();

URL.revokeObjectURL(url);

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
