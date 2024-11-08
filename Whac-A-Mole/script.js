//Selecting elements from HTML
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("timer");
//const messageDisplay = document.getElementById("finalMessage");
const holes = document.querySelectorAll(".hole"); // selecting all the elements that have the class=hole
const bumpSound = document.getElementById("bump");
const gameEndSound = document.getElementById("end-sound");
const gameHigh = document.getElementById("high-sound"); 

let score = 0;
let time = 30;
let isPlaying = false;
let countdown;

function randomTime(min, max){
    return Math.floor(Math.random() * (max-min +1)) + min;
}

function displayImage(){
    // clear image from any hole if present
    holes.forEach(hole => hole.classList.remove("active"));

    //select a random hole to display the image
    const randomHole = holes[Math.floor(Math.random() * holes.length)];

    //set a random time for the image to be active
    const time = randomTime(500, 1500);

    randomHole.classList.add("active");

    //set timeout for the image to go off at the randomHole
    setTimeout(()=>{

        randomHole.classList.remove("active");

        if(isPlaying){
            displayImage();
        }

    }, time);

}

function startGame(){
    score = 0;
    time = 20;
    isPlaying = true;
    startButton.disabled = true;

    //Display the initial score and time
    startButton.textContent = `Playing..`;
    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent =  `Time left: ${time} seconds`;

    countdown = setInterval(()=>{
        //start the timer countdown
        time--;
        timeDisplay.textContent = `Time left: ${time} seconds`;

        if(time===0){
            clearInterval(countdown);
            isPlaying = false;
            startButton.disabled = false;
            startButton.textContent = `Start Game`;
            timeDisplay.textContent = getMessage();
            //gameEndSound.play();
        }

    }, 1000);

    displayImage();
}

function getMessage(){
    if(score === 0){
        gameEndSound.play();
        return "You blinked, didnt you?";
    } else if(score < 10){
        gameEndSound.play();
        return "Nice effort! keep trying.";
    } else if(score < 20){
        gameHigh.play();
        return " You are getting good at this, arent you?";
    } else {
        gameHigh.play();
        return "Wow, you are a champion at FaceBomping!";
    }
}

startButton.addEventListener("click", startGame);

//Event for clicking on the correct image
holes.forEach(hole => {
    hole.addEventListener("click", () =>{
        if(hole.classList.contains("active")){
            hole.classList.remove("active");
            score++;
            scoreDisplay.textContent = `Score: ${score}`;

            // add red border to the image when clicked:
            const image = hole.querySelector("img");
            image.classList.add("clicked");

            bumpSound.currentTime = 0; //restart the sound if already playing
            bumpSound.play();

            //remove the red border after a short delay
            setTimeout(() => {
                image.classList.remove("clicked");
            }, 300); 
        }
    });
});
