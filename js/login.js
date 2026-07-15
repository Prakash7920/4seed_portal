const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw2TQh9Iwor-M0b0kTduVRmUqRNUK3RLzgMRzTXkdsSpWJsJqi2TmKggeT72a7-KDIf/exec";

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
