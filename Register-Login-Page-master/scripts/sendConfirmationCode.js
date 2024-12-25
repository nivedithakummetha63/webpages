const confirmationCodeContainer = document.querySelector('.confirmation-code-container');
const timer = document.querySelector('.timer');
let timerValue;
let intervalID;
let receivedConfirmationCode;

async function sendConfirmationCode() {
    const url = 'http://localhost:3000/confirmation';
    const dataToBeSent = {
        email: email.value
    }

    const options = {
        method: 'POST',
        url: url,
        data: dataToBeSent
    };

    await axios.request(options)
    .then(res=>{
        /* Confirmation code has been sent to the user, wait for them to enter it */
        receivedConfirmationCode = res.data;
        loader.style.display = "none";
        confirmationCodeContainer.style.display = 'flex';
        timerValue = 59;
        runTimer();
    })
    .catch(err=>{
        loader.style.display = "none";
        response.textContent = err.response.message;
        response.classList.remove('response-success');
        response.classList.add('response-failure');
    });
}

function runTimer(){
    intervalID = setInterval(()=>{
        timer.textContent = timerValue--;
    
        if(timerValue < 0){
            clearInterval(intervalID);
            confirmationCodeContainer.style.display = 'none';
            response.textContent = 'Timer expired. Signup again.';
            response.classList.remove('response-success');
            response.classList.add('response-failure');
        }
    }, 1000);
}