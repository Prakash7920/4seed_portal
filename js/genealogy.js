const partner = JSON.parse(localStorage.getItem("partner"));

fetch("https://script.google.com/macros/s/AKfycbwkCA8vAe3n17zpV4gaG8dMulvOibFdE7RckIr04NiiznjHwTMlEBIzb_7HsUuQ5Gpr/exec",{
    method:"POST",
    body:JSON.stringify({
        action:"getGenealogy",
        partnerId:partner.partnerId
    })
})
.then(r=>r.json())
.then(data=>{

    let html="";

    data.members.forEach(m=>{

        html+=`
        <div class="tree-card">
            <h3>${m.name}</h3>
            <p>${m.partnerId}</p>
            <p>${m.rank}</p>
        </div>
        `;

    });

    document.getElementById("treeContainer").innerHTML=html;

});
