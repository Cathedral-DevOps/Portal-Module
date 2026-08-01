const hamburger = document.querySelector(".toggle-btn");
const toggler = document.querySelector("#icon");

hamburger.addEventListener("click", function(){
    document.querySelector("#sidebar").classList.toggle("expand");
    
    // FIX: Removed the "f" from bxf-
    toggler.classList.toggle("bx-chevrons-right");
    toggler.classList.toggle("bx-chevrons-left");
});


const logOutbutton = document.getElementById("logout-btn");
const formForLogout = document.getElementById("logout-form");
logOutbutton.addEventListener("click", function(){
    formForLogout.submit();
});