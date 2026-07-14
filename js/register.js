// ==========================
// Registration Wizard
// ==========================

let currentStep = 1;

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const stepText = document.getElementById("stepText");

const steps = document.querySelectorAll(".step");

// Show Current Step
function showStep(step){

step1.classList.remove("active");
step2.classList.remove("active");
step3.classList.remove("active");

steps.forEach(s=>s.classList.remove("active"));

document.getElementById("step"+step).classList.add("active");

steps[step-1].classList.add("active");

currentStep=step;

updateProgress();

}

// Update Progress Bar
function updateProgress(){

if(currentStep===1){

progressFill.style.width="33%";
progressText.innerHTML="33%";
stepText.innerHTML="Step 1 of 3";

}

if(currentStep===2){

progressFill.style.width="66%";
progressText.innerHTML="66%";
stepText.innerHTML="Step 2 of 3";

}

if(currentStep===3){

progressFill.style.width="100%";
progressText.innerHTML="100%";
stepText.innerHTML="Step 3 of 3";

}

}

// Navigation Buttons
document.getElementById("nextStep1").onclick=function(){

showStep(2);

}

document.getElementById("prevStep2").onclick=function(){

showStep(1);

}

document.getElementById("nextStep2").onclick=function(){

showStep(3);

}

document.getElementById("prevStep3").onclick=function(){

showStep(2);

}
// ==========================
// Validation
// ==========================

const sponsorId = document.getElementById("sponsorId");
const sponsorName = document.getElementById("sponsorName");
const status = document.getElementById("status");

const fullName = document.getElementById("fullName");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const place = document.getElementById("place");

// Step 1 Validation
document.getElementById("nextStep1").onclick = function(){

    if(sponsorId.value.trim()===""){

        alert("Please enter Sponsor ID");

        sponsorId.focus();

        return;

    }

    if(sponsorName.value.trim()===""){

        alert("Please verify Sponsor");

        return;

    }

    showStep(2);

};

// Step 2 Validation
document.getElementById("nextStep2").onclick = function(){

    if(fullName.value.trim()===""){

        alert("Enter Full Name");

        fullName.focus();

        return;

    }

    if(mobile.value.trim().length!=10){

        alert("Enter valid Mobile Number");

        mobile.focus();

        return;

    }

    if(place.value.trim()===""){

        alert("Enter Place");

        place.focus();

        return;

    }

    // Review Screen

    document.getElementById("reviewSponsorId").innerHTML =
    sponsorId.value;

    document.getElementById("reviewSponsorName").innerHTML =
    sponsorName.value;

    document.getElementById("reviewFullName").innerHTML =
    fullName.value;

    document.getElementById("reviewMobile").innerHTML =
    mobile.value;

    document.getElementById("reviewEmail").innerHTML =
    email.value || "Not Provided";

    document.getElementById("reviewPlace").innerHTML =
    place.value;

    showStep(3);

};
// ==========================
// Sponsor Verification
// ==========================

document.getElementById("verifySponsorBtn").onclick = async function(){

const id = sponsorId.value.trim();

if(id===""){

alert("Enter Sponsor ID");

return;

}

status.innerHTML="Verifying...";

status.style.color="blue";

try{

    alert("Calling API...");

    const result = await verifySponsor(id);

    alert(JSON.stringify(result));

}catch(err){

    alert(err.toString());

    console.error(err);

    status.innerHTML="❌ Server Error";

    status.style.color="red";

}
    
if(result.status){

sponsorName.value=result.sponsorName;

status.innerHTML="✅ Sponsor Verified";

status.style.color="green";

}else{

sponsorName.value="";

status.innerHTML="❌ Invalid Sponsor ID";

status.style.color="red";

}

}catch(err){

status.innerHTML="❌ Server Error";

status.style.color="red";

}

}
