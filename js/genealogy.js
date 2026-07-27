const partner = JSON.parse(localStorage.getItem("partner"));

fetch("https://script.google.com/macros/s/AKfycbzo36Z1_t1_dzpEPd4tNWv7vZjRv9zcGOLvNf5m048Yy1CY_A29JtZqZDQhx5lYqNbV/exec",{
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
