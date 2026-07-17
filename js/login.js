const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzrqOtSMas0FnJLs9okljGJlDFm5pClIOreUbzaGhNu61eZu5iJDqJA8_cT7_YrrRW_/exec";

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
