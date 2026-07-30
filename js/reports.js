//==========================================
// 4Seed Reports & Analytics
// reports.js
//==========================================

if(localStorage.getItem("admin")!="true"){

location.href="admin-login.html";

}

const WEB_APP_URL="https://script.google.com/macros/s/AKfycby0gIWVUif3O6Vl1x4ymG8oJMXSTuIHU42pKQDibdXukTfU5uZO5TzYjOIvSX1_kk9X/exec";

let reportData=[];

//==========================================
// Page Load
//==========================================

window.onload=()=>{

loadReports();

};

//==========================================
// Load Reports
//==========================================

function loadReports(){

const fromDate=document.getElementById("fromDate").value;

const toDate=document.getElementById("toDate").value;

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"getReports",

fromDate:fromDate,

toDate:toDate

})

})

.then(res=>res.json())

.then(data=>{

if(data.success){

reportData=data.transactions||[];

loadSummary(data.summary);

renderTable(reportData);

updateCharts(data);

}else{

alert("Unable to load reports.");

}

})

.catch(err=>{

console.error(err);

alert("Server Error");

});

}

//==========================================
// Summary
//==========================================

function loadSummary(summary){

document.getElementById("reportPartners").innerHTML=

summary.totalPartners||0;

document.getElementById("reportWallet").innerHTML=

"₹"+(summary.totalWallet||0);

document.getElementById("reportWithdraw").innerHTML=

"₹"+(summary.totalWithdraw||0);

document.getElementById("reportGrowth").innerHTML=

(summary.growth||0)+"%";

}

//==========================================
// Transaction Table
//==========================================

function renderTable(list){

const tbody=document.querySelector("#reportTable tbody");

tbody.innerHTML="";

if(list.length===0){

tbody.innerHTML=`

<tr>

<td colspan="6"
style="text-align:center;padding:25px;">

No Records Found

</td>

</tr>

`;

return;

}

list.forEach(item=>{

tbody.innerHTML+=`

<tr>

<td>${item.date}</td>

<td>${item.partnerId}</td>

<td>${item.name}</td>

<td>${item.type}</td>

<td>₹${item.amount}</td>

<td>${item.status}</td>

</tr>

`;

});

}

//==========================================
// Refresh
//==========================================

function refreshReports(){

loadReports();

}

//==========================================
// Charts
//==========================================

function updateCharts(data){

if(window.partnerChart){

window.partnerChart.destroy();

}

window.partnerChart=new Chart(

document.getElementById("partnerChart"),

{

type:"line",

data:{

labels:data.partnerLabels||[],

datasets:[{

label:"Partners",

data:data.partnerData||[],

borderWidth:3,

fill:true,

tension:.4

}]

},

options:{

responsive:true

}

}

);

if(window.walletChart){

window.walletChart.destroy();

}

window.walletChart=new Chart(

document.getElementById("walletChart"),

{

type:"bar",

data:{

labels:["Credit","Debit"],

datasets:[{

data:[

data.totalCredit||0,

data.totalDebit||0

]

}]

},

options:{

responsive:true

}

}

);

if(window.withdrawChart){

window.withdrawChart.destroy();

}

window.withdrawChart=new Chart(

document.getElementById("withdrawChart"),

{

type:"doughnut",

data:{

labels:["Approved","Pending","Rejected"],

datasets:[{

data:[

data.approved||0,

data.pending||0,

data.rejected||0

]

}]

}

}

);

if(window.rankChart){

window.rankChart.destroy();

}

window.rankChart=new Chart(

document.getElementById("rankChart"),

{

type:"pie",

data:{

labels:data.rankLabels||[],

datasets:[{

data:data.rankData||[]

}]

}

}

);

}

//==========================================
// Export CSV
//==========================================

function exportReport(){

let csv="Date,Partner ID,Name,Type,Amount,Status\n";

reportData.forEach(item=>{

csv+=`"${item.date}","${item.partnerId}","${item.name}","${item.type}","${item.amount}","${item.status}"\n`;

});

const blob=new Blob([csv],{

type:"text/csv"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="4Seed_Report.csv";

a.click();

URL.revokeObjectURL(url);

}

//==========================================
// Print
//==========================================

function printReport(){

window.print();

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

loadReports();

},60000);
