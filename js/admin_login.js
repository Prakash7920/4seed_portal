const WEB_APP_URL="https://script.google.com/macros/s/AKfycbx_y7TYGA-qICmgj4zBCBGa3QGvmjSKqBaxbgoFfdJAdScFvwMnzFhR2xxi0D0VkbQ/exec";

function adminLogin(){

    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;

    fetch(WEB_APP_URL,{
        method:"POST",
        body:JSON.stringify({
            action:"adminLogin",
            username:username,
            password:password
        })
    })
    .then(res=>res.json())
    .then(data=>{

        if(data.success){

            localStorage.setItem("admin","true");

            location.href="admin.html";

        }else{

            alert("Invalid Username or Password");

        }

    });


