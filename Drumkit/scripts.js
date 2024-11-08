const kickButton = document.getElementById("kick");
const kickSound = document.getElementById("kick-sound");

kickButton.addEventListener("click", function(){

    kickSound.currentTime = 0; //restart the sound if it was already playing
    kickSound.play();
});

document.addEventListener("keydown", function(event){
    if(event.key==='a'){
        kickSound.currentTime=0;
        kickSound.play();
    }
})