const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwhub93htUz8GehM7tbfugo0YejhohT2j-Dx3M7mOn6aqzvuq8YBc2OOdD_wmJCyGRe/exec";

document
.getElementById("loginForm")
.addEventListener("submit", login);

async function login(e){

    e.preventDefault();

    const loginId =
    document.getElementById("loginId").value.trim();

    const password =
    document.getElementById("loginPassword").value.trim();

    try{

        const response = await fetch(WEB_APP_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"login",

                loginId:loginId,

                password:password

            })

        });

        const data = await response.json();

        if(data.status){

            localStorage.setItem(
                "partner",
                JSON.stringify(data)
            );

            window.location.href="dashboard.html";

        }else{

            alert("Invalid Partner ID or Password");
        }

    }catch(err){

    console.error(err);

    alert(err.message);

    }

}
