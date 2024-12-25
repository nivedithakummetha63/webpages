async function registerUser() {
    loader.style.display = "flex";

    const url = 'http://localhost:3001/signup';
    const dataToBeSent = {
        email: email.value,
        username: username.value,
        password: password.value,
    }

    const options = {
        method: 'POST',
        url: url,
        data: dataToBeSent,
        withCredentials: true
    };

    await axios.request(options)
        .then(res => {
            loader.style.display = "none";
            window.location.href = 'userHomepage.html';
        })
        .catch(err => {
            loader.style.display = "none";
            response.textContent = err.response.data;
            response.classList.remove('response-success');
            response.classList.add('response-failure');
        })
}