const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzo36Z1_t1_dzpEPd4tNWv7vZjRv9zcGOLvNf5m048Yy1CY_A29JtZqZDQhx5lYqNbV/exec";

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
