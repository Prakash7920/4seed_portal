const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw9Ua13_kwH7uNr0g_UAeWBxC0serpgNBhTNvjGMPFVXDbT92kS0iE39oB6o8171CkD/exec";

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

            console.log(data);
alert(JSON.stringify(data));
        }

    }catch(err){

    console.error(err);

    alert(err.message);

    }

}
