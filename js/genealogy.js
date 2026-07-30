const partner = JSON.parse(localStorage.getItem("partner"));

fetch("https://script.google.com/macros/s/AKfycbxtg8NM_aQxAxw5IjsP5oeKsDe3qQbVpGLL2qk70HvPAvWF-5fKvhNYUox6Egsa29VJ/exec",{
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
