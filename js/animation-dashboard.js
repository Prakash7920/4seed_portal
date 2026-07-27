document.querySelectorAll("[data-count]").forEach(counter => {

let target = Number(counter.dataset.count);
let current = 0;

const step = Math.max(1, Math.ceil(target / 80));

const timer = setInterval(() => {

current += step;

if(current >= target){

current = target;
clearInterval(timer);

}

counter.textContent = current;

},20);

});
