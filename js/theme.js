// Theme Manager

const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme){
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

function toggleTheme(){
    const current = localStorage.getItem("theme") || "light";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
}

(function(){
    const saved = localStorage.getItem("theme") || "light";
    applyTheme(saved);
})();

if(themeBtn){
    themeBtn.addEventListener("click", toggleTheme);
}
