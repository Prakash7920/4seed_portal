window.addEventListener("scroll", function () {

    const nav = document.querySelector(".navbar");

    if (window.scrollY > 80) {

        nav.style.background = "#0B7A3D";
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,.25)";

    } else {

        nav.style.background = "rgba(11,122,61,.95)";
        nav.style.boxShadow = "none";

    }

});
