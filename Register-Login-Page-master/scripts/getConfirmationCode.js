const confirmationCodeForm = confirmationCodeContainer.querySelector('.confirmation-code-form');
const confirmationCode = confirmationCodeForm.querySelector('.confirmation-code');

confirmationCodeForm.addEventListener('submit', checkConfirmationCode);

function checkConfirmationCode(evt){
    evt.preventDefault();
    clearInterval(intervalID);
    confirmationCodeContainer.style.display = 'none';

    if (Number(confirmationCode.value) === receivedConfirmationCode){
        registerUser();
    } else{        
        response.textContent = 'You entered the wrong confirmation code. Signup again.';
        response.classList.remove('response-success');
        response.classList.add('response-failure');
    }
}