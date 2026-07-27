const WEB_APP_URL="https://script.google.com/macros/s/AKfycbzo36Z1_t1_dzpEPd4tNWv7vZjRv9zcGOLvNf5m048Yy1CY_A29JtZqZDQhx5lYqNbV/exec";

fetch(WEB_APP_URL,{
    method:"POST",
    body:JSON.stringify({
        action:"getLeaderboard"
    })
})
.then(res=>res.json())
.then(data=>{

    let html="";

    if(data.leaderboard.length===0){

        html=`
        <tr>
            <td colspan="5" class="no-data">
                No Records Found
            </td>
        </tr>
        `;

    }else{

        data.leaderboard.forEach((item,index)=>{

            let medal=index+1;

            if(index===0) medal="🥇";
            else if(index===1) medal="🥈";
            else if(index===2) medal="🥉";

            html+=`
            <tr>

                <td>${medal}</td>

                <td>${item.partnerId}</td>

                <td>${item.name}</td>

                <td>${item.team}</td>

                <td>${item.rank}</td>

            </tr>
            `;

        });

    }

    document.getElementById("leaderboardTable").innerHTML=html;

})
.catch(err=>{

    console.log(err);

    document.getElementById("leaderboardTable").innerHTML=`
    <tr>
        <td colspan="5" class="no-data">
            Failed to load leaderboard.
        </td>
    </tr>
    `;

});
