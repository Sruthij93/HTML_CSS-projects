var button = document.getElementById("button");
var message_container = document.getElementById("message-container");
var firstName = "Sruthi";
button.addEventListener("click", function(){
    // console.log("Welcome");
    message_container.textContent = "Welcome, " + firstName + "!";
});