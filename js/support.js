const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwkCA8vAe3n17zpV4gaG8dMulvOibFdE7RckIr04NiiznjHwTMlEBIzb_7HsUuQ5Gpr/exec";

const partner = JSON.parse(localStorage.getItem("partner"));

function submitTicket(){

    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if(subject==="" || message===""){
        alert("Please fill all fields.");
        return;
    }

    fetch(WEB_APP_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            action:"submitSupport",
            partnerId:partner.partnerId,
            subject:subject,
            message:message
        })
    })
    .then(res=>res.json())
    .then(data=>{

        alert(data.message);

        if(data.success){

            document.getElementById("subject").value="";
            document.getElementById("message").value="";

        }

    });

}
