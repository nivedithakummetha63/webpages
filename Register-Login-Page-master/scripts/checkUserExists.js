const loader = document.querySelector('.loader');
const form = document.querySelector('.form');
const response = document.querySelector('.response');

/* Check if the user already exists */
form.addEventListener('submit', checkUserExists);

async function checkUserExists(evt) {
    evt.preventDefault();

    /* Username cannot be empty */
    const meetingUsernameSpecifications = checkUsernameSpecifications();
    if (!meetingUsernameSpecifications) {
        username.focus();
        return;
    }
    /* Email must meet the specifications */
    const meetingEmailSpecifications = checkEmailSpecifications();
    if (!meetingEmailSpecifications) {
        email.focus();
        return;
    }

    /* Password must meet the specifications */
    const meetingPasswordSpecifications = checkPasswordSpecifications();
    if (!meetingPasswordSpecifications) {
        password.focus();
        specificationMessages[2].style.opacity = "1";
        specificationMessages[2].style.zIndex = "1";
        return;
    }

    /* Passwords must match on form submission */
    if (password.value !== confirmPassword.value) {
        confirmPassword.focus();
        matchMessage.style.opacity = "1";
        matchMessage.style.zIndex = "1";
        return;
    }

    loader.style.display = "flex";

    const url = 'http://localhost:3001/checkUserExists';
    const dataToBeSent = {
        email: email.value,
        username: username.value
    }

    const options = {
        method: 'POST',
        url: url,
        data: dataToBeSent,
        withCredentials: true
    };

    await axios.request(options)
        .then(res => {
            /* If the user does not already exist, go to the next step: */
            sendConfirmationCode();
        })
        .catch(err => {
            loader.style.display = "none";
            response.textContent = err.response.data;
            response.classList.remove('response-success');
            response.classList.add('response-failure');
        });
}