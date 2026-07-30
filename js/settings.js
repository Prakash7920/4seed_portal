//==========================================
// 4Seed Settings
// settings.js
//==========================================

if(localStorage.getItem("admin")!="true"){

location.href="admin-login.html";

}

const WEB_APP_URL="https://script.google.com/macros/s/AKfycby0gIWVUif3O6Vl1x4ymG8oJMXSTuIHU42pKQDibdXukTfU5uZO5TzYjOIvSX1_kk9X/exec";

//==========================================
// Page Load
//==========================================

window.onload=()=>{

loadSettings();

};

//==========================================
// Load Settings
//==========================================

function loadSettings(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"getSettings"

})

})

.then(res=>res.json())

.then(data=>{

if(data.success){

const s=data.settings;

// Company

document.getElementById("companyName").value=s.companyName||"";

document.getElementById("companyEmail").value=s.companyEmail||"";

document.getElementById("companyPhone").value=s.companyPhone||"";

document.getElementById("companyWebsite").value=s.companyWebsite||"";

document.getElementById("companyAddress").value=s.companyAddress||"";

// Business

document.getElementById("registrationFee").value=s.registrationFee||0;

document.getElementById("joiningBonus").value=s.joiningBonus||0;

document.getElementById("minimumWithdraw").value=s.minimumWithdraw||0;

document.getElementById("maximumWithdraw").value=s.maximumWithdraw||0;

// Payment

document.getElementById("upiId").value=s.upiId||"";

document.getElementById("bankName").value=s.bankName||"";

document.getElementById("accountNumber").value=s.accountNumber||"";

document.getElementById("ifscCode").value=s.ifscCode||"";

// Admin

document.getElementById("adminUsername").value=s.adminUsername||"";

}

})

.catch(err=>{

console.error(err);

alert("Unable to load settings.");

});

}

//==========================================
// Save Settings
//==========================================

function saveSettings(){

const password=document.getElementById("adminPassword").value;

const confirm=document.getElementById("confirmPassword").value;

if(password!==confirm){

alert("Password does not match.");

return;

}

const settings={

companyName:document.getElementById("companyName").value,

companyEmail:document.getElementById("companyEmail").value,

companyPhone:document.getElementById("companyPhone").value,

companyWebsite:document.getElementById("companyWebsite").value,

companyAddress:document.getElementById("companyAddress").value,

registrationFee:document.getElementById("registrationFee").value,

joiningBonus:document.getElementById("joiningBonus").value,

minimumWithdraw:document.getElementById("minimumWithdraw").value,

maximumWithdraw:document.getElementById("maximumWithdraw").value,

upiId:document.getElementById("upiId").value,

bankName:document.getElementById("bankName").value,

accountNumber:document.getElementById("accountNumber").value,

ifscCode:document.getElementById("ifscCode").value,

adminUsername:document.getElementById("adminUsername").value,

adminPassword:password

};

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"saveSettings",

settings:settings

})

})

.then(res=>res.json())

.then(data=>{

if(data.success){

alert("Settings saved successfully.");

}else{

alert(data.message||"Unable to save settings.");

}

})

.catch(err=>{

console.error(err);

alert("Server Error");

});

}
//==========================================
// Logo Preview
//==========================================

document.getElementById("companyLogo")
?.addEventListener("change",function(){

const file=this.files[0];

if(file){

console.log("Logo Selected:",file.name);

}

});

document.getElementById("websiteBanner")
?.addEventListener("change",function(){

const file=this.files[0];

if(file){

console.log("Banner Selected:",file.name);

}

});

//==========================================
// Backup Data
//==========================================

function backupData(){

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

action:"backupDatabase"

})

})

.then(res=>res.json())

.then(data=>{

if(data.success){

const blob=new Blob(

[JSON.stringify(data.backup,null,2)],

{type:"application/json"}

);

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="4Seed_Backup.json";

a.click();

URL.revokeObjectURL(url);

}else{

alert("Backup failed.");

}

})

.catch(err=>{

console.error(err);

alert("Server Error");

});

}

//==========================================
// Restore Data
//==========================================

function restoreData(){

alert("Restore module will be enabled after file upload integration.");

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
// Auto Save Reminder
//==========================================

setInterval(()=>{

console.log("Auto-save reminder");

},300000);

//==========================================
// Theme Switch
//==========================================

function toggleDarkMode(){

document.body.classList.toggle("dark");

localStorage.setItem(

"theme",

document.body.classList.contains("dark")

?"dark":"light"

);

}

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="dark"){

document.body.classList.add("dark");

}

//==========================================
// Auto Refresh Settings
//==========================================

setInterval(()=>{

loadSettings();

},600000);
