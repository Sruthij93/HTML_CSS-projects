// get the form element and the confirmation message element
const rsvpForm = document.getElementById("rsvp-form");
const confirmationMsg = document.getElementById("Confirmation_msg");
const body = document.body;

rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault(); //prevent form submission

    //get selected attendance value
    const attendance = document.getElementById("attendance").value;

    if(attendance === 'yes') {
        confirmationMsg.innerHTML = '🥳 Party is on!! We look forward to seeing you at the GIF Gala!';
        body.style.backgroundImage = 'url("https://media.giphy.com/media/l2JHPB58MjfV8W3K0/giphy.gif")';
    }
    else if(attendance === 'no'){
        confirmationMsg.innerHTML = '😢 We are sad that you are unable to make it! Take care!';
        confirmationMsg.style.color = '#333';
        body.style.backgroundImage = 'url("https://media.giphy.com/media/JER2en0ZRiGUE/giphy.gif")';
    }

    confirmationMsg.style.display = 'block';

    rsvpForm.reset();
});