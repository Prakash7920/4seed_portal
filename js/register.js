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
