const loader = document.querySelector('.loader');
const forgotPasswordForm = document.querySelector('.forgot-password-form');
const email = forgotPasswordForm.querySelector('input');
const response = document.querySelector('.response');
const warning = document.querySelector('.warning');
forgotPasswordForm.addEventListener('submit', sendResetLink);

async function sendResetLink(evt) {
    evt.preventDefault();
    loader.style.display = 'flex';

    const url = 'http://localhost:3001/sendResetLink';
    const dataToBeSent = {
        email: email.value
    }

    const options = {
        method: 'POST',
        url: url,
        data: dataToBeSent,
        withCredentials: true
    }

    await axios.request(options)
        .then((res) => {
            loader.style.display = 'none';
            response.textContent = res.data;
            warning.style.display = 'block';
            response.classList.add('response-success');
            response.classList.remove('response-failure');
        })
        .catch((err) => {
            loader.style.display = 'none';
            response.textContent = err.response.data;
            response.classList.remove('response-success');
            response.classList.add('response-failure');
        });
}