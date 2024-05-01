const form = document.querySelector('#form');
const result = document.querySelector('#result');

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', validateForm);
})

function validateForm(e) {
    e.preventDefault();
    const termSearch = document.querySelector('#term').value;
    if(termSearch === '') {
        showAlert('Please add a term to search');
        return;
    } else {
        searchImages(termSearch)
    }
}

function showAlert(message) {
    const checkAlert = document.querySelector('.bg-red-100');

    if(!checkAlert) {
        const alert = document.createElement('p');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
    
    
        alert.innerHTML = `<strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${message}</span>
        `;
        form.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 2000);
    }
    
}

function searchImages(termSearch) {
    const key = '';
    const url = `https://pixabay.com/api/?key=${key}&q=${termSearch}`

    fetch(url)
        .then(res => res.json())
        .then(res => console.log(res.hits));
}