const hamburger = document.querySelector(".toggle-btn");
const toggler = document.querySelector("#icon");

hamburger.addEventListener("click", function(){
    document.querySelector("#sidebar").classList.toggle("expand");
    
    // FIX: Removed the "f" from bxf-
    toggler.classList.toggle("bx-chevrons-right");
    toggler.classList.toggle("bx-chevrons-left");
});


const logOutbutton = document.getElementById("logout-btn");
if (logOutbutton) {
    logOutbutton.addEventListener("click", async function(event){
        event.preventDefault();

        if (window.firebase && firebase.auth) {
            try {
                await firebase.auth().signOut();
            } catch (error) {
                console.error("Firebase client sign-out failed:", error);
            }
        }

        try {
            await fetch("/api/logout/txdash", { method: "GET", credentials: "same-origin" });
        } catch (error) {
            console.error("Backend logout request failed:", error);
        }

        window.location.href = "/texsef";
    });
}