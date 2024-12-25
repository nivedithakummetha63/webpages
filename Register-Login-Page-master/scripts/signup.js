const showHidePasswordBtns = document.querySelectorAll('.showHidePassword');
const inputs = document.querySelectorAll('.form-input');
const [username, email, password, confirmPassword] = [...inputs];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Show/hide password */
showHidePasswordBtns[1].addEventListener('click', () => {
    showHidePasswordBtns[1].style.display = "none";
    password.setAttribute('type', 'text');
});
showHidePasswordBtns[0].addEventListener('click', () => {
    showHidePasswordBtns[1].style.display = "initial";
    password.setAttribute('type', 'password');
});
showHidePasswordBtns[3].addEventListener('click', () => {
    showHidePasswordBtns[3].style.display = "none";
    confirmPassword.setAttribute('type', 'text');
});
showHidePasswordBtns[2].addEventListener('click', () => {
    showHidePasswordBtns[3].style.display = "initial";
    confirmPassword.setAttribute('type', 'password');
});

/* No spaces allowed in username and meet all the specifications for the password */
const specificationMessages = document.querySelectorAll('.check-for-specifications');
const usernameEmptySpecification = specificationMessages[0].querySelectorAll('li')[1];
const passwordSpecificationList = specificationMessages[2].querySelectorAll('li');
let flag;

username.addEventListener('input', checkUsernameSpecifications);
username.addEventListener('focusout', () => {
    specificationMessages[0].style.opacity = "0";
    specificationMessages[0].style.zIndex = "-1";
});
email.addEventListener('input', () => {
    specificationMessages[1].style.opacity = "0";
    specificationMessages[1].style.zIndex = "-1";
});
email.addEventListener('focusout', () => {
    specificationMessages[1].style.opacity = "0";
    specificationMessages[1].style.zIndex = "-1";
});
password.addEventListener('focusin', () => {
    specificationMessages[2].style.opacity = "1";
    specificationMessages[2].style.zIndex = "1";
});
password.addEventListener('input', checkPasswordSpecifications);
password.addEventListener('focusout', () => {
    specificationMessages[2].style.opacity = "0";
    specificationMessages[2].style.zIndex = "-1";
});

function checkUsernameSpecifications() {
    if (username.value.includes(' ')) {
        username.value = username.value.substring(0, username.value.length - 1);
        specificationMessages[0].style.opacity = "1";
        specificationMessages[0].style.zIndex = "1";
    } else {
        specificationMessages[0].style.opacity = "0";
        specificationMessages[0].style.zIndex = "-1";
    }
    if (username.value.length === 0) {
        specificationMessages[0].style.opacity = "1";
        specificationMessages[0].style.zIndex = "1";
        usernameEmptySpecification.style.display = "list-item";
        return false;
    } else {
        usernameEmptySpecification.style.display = "none";
    }
    if (username.value.includes(' ') && username.value.length !== 0) {
        specificationMessages[0].style.opacity = "0";
        specificationMessages[0].style.zIndex = "-1";
    }

    return true;
};

function checkEmailSpecifications() {
    if (/\s/.test(email.value) || !emailPattern.test(email.value)) {
        specificationMessages[1].style.opacity = "1";
        specificationMessages[1].style.zIndex = "1";
        return false;
    }

    return true;
}

function checkPasswordSpecifications() {
    flag = true;

    if (password.value.includes(' ')) {
        passwordSpecificationList[0].style.display = 'list-item';
        password.value = password.value.substring(0, password.value.length - 1);
    } else {
        passwordSpecificationList[0].style.display = 'none';
    }

    if (password.value.length < 8) {
        passwordSpecificationList[1].style.display = 'list-item';
        flag = false;
    } else {
        passwordSpecificationList[1].style.display = 'none';
    }

    if (/[A-Z]/.test(password.value)) {
        passwordSpecificationList[3].style.display = 'none';
    } else {
        passwordSpecificationList[3].style.display = 'list-item';
        flag = false;
    }

    if (/[a-z]/.test(password.value)) {
        passwordSpecificationList[4].style.display = 'none';
    } else {
        passwordSpecificationList[4].style.display = 'list-item';
        flag = false;
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
        passwordSpecificationList[5].style.display = 'none';
    } else {
        passwordSpecificationList[5].style.display = 'list-item';
        flag = false;
    }

    if (/\d/.test(password.value)) {
        passwordSpecificationList[6].style.display = 'none';
    } else {
        passwordSpecificationList[6].style.display = 'list-item';
        flag = false;
    }

    return flag;
}

/* Check if the passwords match */
confirmPassword.addEventListener('input', checkForMatch);
confirmPassword.addEventListener('focusout', hideMatchMessage);
const matchMessage = document.querySelector('.check-for-match');

function checkForMatch() {
    if (this.value !== password.value.substring(0, this.value.length)) {
        matchMessage.style.opacity = "1";
        matchMessage.style.zIndex = "1";
    }
    else {
        matchMessage.style.opacity = "0";
        matchMessage.style.zIndex = "-1";
    }
}

function hideMatchMessage() {
    matchMessage.style.opacity = "0";
    matchMessage.style.zIndex = "-1";
}