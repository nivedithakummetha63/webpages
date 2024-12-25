const deleteAccountBtn = document.querySelector('.delete-account-btn');
const modalContainer = document.querySelector('.modal-container');
const crossBtn = modalContainer.querySelector('.modal-heading button');
const cancelBtn = modalContainer.querySelector('.cancel-btn');
const confirmDeletionBtn = modalContainer.querySelector('.confirm-deletion-btn');

deleteAccountBtn.addEventListener('click', showDialog);
crossBtn.addEventListener('click', hideDialog);
cancelBtn.addEventListener('click', hideDialog);
confirmDeletionBtn.addEventListener('click', deleteAccount);

function showDialog(){
    modalContainer.style.display = 'initial';
}

function hideDialog(){
    modalContainer.style.display = 'none';
}

async function deleteAccount(evt) {
    evt.preventDefault()
    modalContainer.style.display = 'none';
    loader.style.display = "flex";

    const url = 'http://localhost:3001/deleteAccount';
    const options = {
        method: 'POST',
        url: url,
        withCredentials: true
    };

    await axios.request(options)
        .then(res => {
            loader.style.display = "none";
            response.textContent = `${res.data}. Redirecting to login page soon...`;
            response.classList.add('response-success');
            response.classList.remove('response-failure');
            
            setTimeout(()=>{
                window.location.href = '../index.html';
            },3000);
        })
        .catch(err => {
            loader.style.display = "none";
            console.log(err);
            response.textContent = err.response.data;
            response.classList.remove('response-success');
            response.classList.add('response-failure');
        })
}