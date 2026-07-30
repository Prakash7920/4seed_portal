// Fade Animation

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

document.querySelectorAll(".animate").forEach(el=>{
    observer.observe(el);
});


// Counter Animation

document.querySelectorAll(".counter").forEach(counter=>{

    const target = Number(counter.innerText);

    let count = 0;

    const speed = target/80;

    function update(){

        if(count<target){

            count += speed;

            counter.innerText=Math.ceil(count);

            requestAnimationFrame(update);

        }else{

            counter.innerText=target;

        }

    }

    update();

});


// Ripple Effect

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        ripple.style.left=e.offsetX+"px";

        ripple.style.top=e.offsetY+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


// Card Hover

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        card.style.setProperty("--x",x+"px");

        card.style.setProperty("--y",y+"px");

    });

});


// Scroll to Top

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(!topBtn)return;

    topBtn.style.display=
    window.scrollY>300?"flex":"none";

});

if(topBtn){

    topBtn.onclick=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

}
