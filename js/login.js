const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw-qnGg3C4PJhDjs3PTZhrpNnwXKGUuQRVte0ca4GKG69gtZ0iNhwypiCb18PArEwsU/exec";

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
