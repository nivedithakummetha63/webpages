const loader = document.querySelector('.loader');
const resetPasswordForm = document.querySelector('.reset-password-form');
const showHidePasswordBtns = resetPasswordForm.querySelectorAll('.showHidePassword');
const newPassword = resetPasswordForm.querySelector('#newPassword');
const specificationMessage = resetPasswordForm.querySelector('.check-for-specifications');
const passwordSpecificationList = specificationMessage.querySelectorAll('li');
const response = document.querySelector('.response');
let flag;

/* Show/hide password */
showHidePasswordBtns[1].addEventListener('click', () => {
    showHidePasswordBtns[1].style.display = "none";
    newPassword.setAttribute('type', 'text');
});
showHidePasswordBtns[0].addEventListener('click', () => {
    showHidePasswordBtns[1].style.display = "initial";
    newPassword.setAttribute('type', 'password');
});

/* Meet all the specifications for the password */
newPassword.addEventListener('focusin', () => {
    specificationMessage.style.opacity = "1";
    specificationMessage.style.zIndex = "1";
});
newPassword.addEventListener('input', checkPasswordSpecifications);
newPassword.addEventListener('focusout', () => {
    specificationMessage.style.opacity = "0";
    specificationMessage.style.zIndex = "-1";
});

function checkPasswordSpecifications() {
    flag = true;

    if (newPassword.value.includes(' ')) {
        passwordSpecificationList[0].style.display = 'list-item';
        newPassword.value = newPassword.value.substring(0, newPassword.value.length - 1);
    } else {
        passwordSpecificationList[0].style.display = 'none';
    }

    if (newPassword.value.length < 8) {
        passwordSpecificationList[1].style.display = 'list-item';
        flag = false;
    } else {
        passwordSpecificationList[1].style.display = 'none';
    }

    if (/[A-Z]/.test(newPassword.value)) {
        passwordSpecificationList[3].style.display = 'none';
    } else {
        passwordSpecificationList[3].style.display = 'list-item';
        flag = false;
    }

    if (/[a-z]/.test(newPassword.value)) {
        passwordSpecificationList[4].style.display = 'none';
    } else {
        passwordSpecificationList[4].style.display = 'list-item';
        flag = false;
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(newPassword.value)) {
        passwordSpecificationList[5].style.display = 'none';
    } else {
        passwordSpecificationList[5].style.display = 'list-item';
        flag = false;
    }

    if (/\d/.test(newPassword.value)) {
        passwordSpecificationList[6].style.display = 'none';
    } else {
        passwordSpecificationList[6].style.display = 'list-item';
        flag = false;
    }

    return flag;
}

/* Get the token value from the page url */
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

/* Submit the form */
resetPasswordForm.addEventListener('submit', resetPassword);

async function resetPassword(evt) {
    evt.preventDefault();

    /* Password must meet the specifications */
    const meetingPasswordSpecifications = checkPasswordSpecifications();
    if (!meetingPasswordSpecifications) {
        newPassword.focus();
        specificationMessage.style.opacity = "1";
        specificationMessage.style.zIndex = "1";
        return;
    }

    loader.style.display = 'flex';

    const url = 'http://localhost:3001/resetPassword';
    const dataToBeSent = {
        token: token,
        newPassword: newPassword.value
    }

    const options = {
        method: 'POST',
        url: url,
        data: dataToBeSent
    }

    await axios.request(options)
        .then((res) => {
            loader.style.display = 'none';
            response.textContent = `${res.data} Redirecting to your login page soon...`;
            response.classList.add('response-success');
            response.classList.remove('response-failure');
            
            setTimeout(()=>{
                window.location.href = '../index.html';
            },4000);
        })
        .catch((err) => {
            loader.style.display = 'none';
            response.textContent = err.response.data;
            response.classList.remove('response-success');
            response.classList.add('response-failure');
        });
}