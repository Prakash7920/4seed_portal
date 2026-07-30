//==========================================
// 4Seed Withdraw Management
// withdraw.js
//==========================================

if(localStorage.getItem("admin")!="true"){

location.href="admin-login.html";

}

const WEB_APP_URL="YOUR_WEB_APP_URL";

let withdrawData=[];

let filteredData=[];

//==========================================
// Page Load
//==========================================

window.onload=()=>{

loadWithdrawSummary();

loadWithdrawRequests();

};

//==========================================
// Dashboard Summary
//==========================================

function loadWithdrawSummary(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"getWithdrawSummary"

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

document.getElementById("pendingCount").innerHTML=data.pending;

document.getElementById("approvedCount").innerHTML=data.approved;

document.getElementById("rejectedCount").innerHTML=data.rejected;

document.getElementById("withdrawAmount").innerHTML="₹"+data.totalAmount;

}

})

.catch(err=>console.error(err));

}

//==========================================
// Load Requests
//==========================================

function loadWithdrawRequests(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"getWithdrawRequests"

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

withdrawData=data.requests;

filteredData=[...withdrawData];

renderWithdraw(filteredData);

}

})

.catch(err=>console.error(err));

}

//==========================================
// Render Table
//==========================================

function renderWithdraw(list){

const tbody=document.querySelector("#withdrawTable tbody");

tbody.innerHTML="";

if(list.length===0){

tbody.innerHTML=`

<tr>

<td colspan="8"
style="text-align:center;padding:30px;">

No withdrawal requests found.

</td>

</tr>

`;

return;

}

list.forEach(item=>{

tbody.innerHTML+=`

<tr>

<td>${item.requestId}</td>

<td>${item.partnerId}</td>

<td>${item.name}</td>

<td>₹${item.amount}</td>

<td>${item.paymentMethod||"-"}</td>

<td>${item.date}</td>

<td>

<span class="status-${(item.status||'Pending').toLowerCase()}">

${item.status}

</span>

</td>

<td>

<button
class="action-btn view-btn"
onclick="viewWithdraw('${item.requestId}')">

<i class="fas fa-eye"></i>

</button>

${item.status==="Pending"?`

<button
class="action-btn wallet-btn"
onclick="openWithdrawPopup('${item.requestId}')">

<i class="fas fa-check"></i>

</button>

`:``}

</td>

</tr>

`;

});

}

//==========================================
// Refresh
//==========================================

function refreshWithdraw(){

loadWithdrawSummary();

loadWithdrawRequests();

}
//==========================================
// Search
//==========================================

function searchWithdraw(){

const keyword=document
.getElementById("withdrawSearch")
.value
.toLowerCase()
.trim();

filteredData=withdrawData.filter(item=>

(item.partnerId||"")
.toLowerCase()
.includes(keyword)

||

(item.name||"")
.toLowerCase()
.includes(keyword)

||

(item.requestId||"")
.toLowerCase()
.includes(keyword)

);

renderWithdraw(filteredData);

}

//==========================================
// Filter
//==========================================

function filterWithdraw(status){

if(status==="All"){

filteredData=[...withdrawData];

}else{

filteredData=withdrawData.filter(item=>

(item.status||"Pending")===status

);

}

renderWithdraw(filteredData);

}

//==========================================
// View Details
//==========================================

function viewWithdraw(requestId){

const req=withdrawData.find(x=>x.requestId==requestId);

if(!req) return;

document.getElementById("viewPartnerId").innerHTML=req.partnerId;

document.getElementById("viewName").innerHTML=req.name;

document.getElementById("viewAmount").innerHTML="₹"+req.amount;

document.getElementById("viewStatus").innerHTML=req.status;

document.getElementById("viewBank").innerHTML=req.paymentMethod||"-";

document.getElementById("viewDate").innerHTML=req.date;

document.getElementById("viewRemarks").innerHTML=req.remarks||"-";

document.getElementById("viewPopup").style.display="flex";

}

function closeViewPopup(){

document.getElementById("viewPopup").style.display="none";

}

//==========================================
// Open Approval Popup
//==========================================

function openWithdrawPopup(requestId){

const req=withdrawData.find(x=>x.requestId==requestId);

if(!req) return;

document.getElementById("requestId").value=req.requestId;

document.getElementById("partnerId").value=req.partnerId;

document.getElementById("partnerName").value=req.name;

document.getElementById("withdrawAmountInput").value=req.amount;

document.getElementById("paymentMethod").value=req.paymentMethod||"";

document.getElementById("withdrawRemarks").value="";

document.getElementById("withdrawPopup").style.display="flex";

}

function closeWithdrawPopup(){

document.getElementById("withdrawPopup").style.display="none";

}

//==========================================
// Approve Withdraw
//==========================================

function approveWithdraw(){

updateWithdrawStatus("Approved");

}

//==========================================
// Reject Withdraw
//==========================================

function rejectWithdraw(){

updateWithdrawStatus("Rejected");

}

//==========================================
// Update Status
//==========================================

function updateWithdrawStatus(status){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"updateWithdrawStatus",

requestId:document.getElementById("requestId").value,

status:status,

remarks:document.getElementById("withdrawRemarks").value

})

})

.then(r=>r.json())

.then(data=>{

if(data.success){

alert("Request "+status);

closeWithdrawPopup();

refreshWithdraw();

}else{

alert(data.message||"Operation failed.");

}

})

.catch(err=>{

console.error(err);

alert("Server Error");

});

}

//==========================================
// Export CSV
//==========================================

function exportWithdraw(){

let csv="Request ID,Partner ID,Name,Amount,Status,Date\n";

filteredData.forEach(item=>{

csv+=`"${item.requestId}","${item.partnerId}","${item.name}","${item.amount}","${item.status}","${item.date}"\n`;

});

const blob=new Blob([csv],{

type:"text/csv"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="Withdraw_Report.csv";

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
