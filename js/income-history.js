const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzo36Z1_t1_dzpEPd4tNWv7vZjRv9zcGOLvNf5m048Yy1CY_A29JtZqZDQhx5lYqNbV/exec";

const partner = JSON.parse(localStorage.getItem("partner"));

fetch(WEB_APP_URL,{
    method:"POST",
    body:JSON.stringify({
        action:"getIncomeHistory",
        partnerId:partner.partnerId
    })
})
.then(res=>res.json())
.then(data=>{

    let html="";

    if(data.history.length===0){

        html=`
        <tr>
            <td colspan="5">No Income History Found</td>
        </tr>
        `;

    }else{

        data.history.forEach(item=>{

            html+=`
            <tr>
                <td>${item.date}</td>
                <td>${item.type}</td>
                <td>₹${item.amount}</td>
                <td>${item.from}</td>
                <td>${item.status}</td>
            </tr>
            `;

        });

    }

    document.getElementById("incomeTable").innerHTML=html;

})
.catch(error=>{
    console.error(error);

    document.getElementById("incomeTable").innerHTML=`
    <tr>
        <td colspan="5">Failed to load income history.</td>
    </tr>`;
});
