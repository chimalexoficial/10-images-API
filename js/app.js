const form = document.querySelector('#form');
const result = document.querySelector('#result');
const paginationDiv = document.querySelector('#pagination')
const itemsPerPage = 40;
let totalPages, iterator, actualPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', validateForm);
});

function validateForm(e) {
    e.preventDefault();
    const termSearch = document.querySelector('#term').value;
    if (termSearch === '') {
        showAlert('Please add a term to search');
        return;
    } else {
        searchImages()
    }
}

function showAlert(message) {
    const checkAlert = document.querySelector('.bg-red-100');

    if (!checkAlert) {
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

function searchImages() {
    const termSearch = document.querySelector('#term').value;
    const key = '';
    const url = `https://pixabay.com/api/?key=${key}&q=${termSearch}&per_page=${itemsPerPage}&page=${actualPage}`;


    fetch(url)
        .then(res => res.json())
        .then(res => {
            totalPages = calculatePages(res.totalHits)
            console.log(totalPages);
            showImages(res.hits)
        })
}

// Pages generator
function* createPages(total) {
    for (let i = 0; i <= total; i++) {
        yield i;
    }
}

function calculatePages(total) {
    return parseInt(Math.ceil(total / itemsPerPage));
}

function showImages(imagesArray) {
    console.log(imagesArray);
    while (result.firstChild) {
        result.removeChild(result.firstChild)
    }

    // iterating over array
    imagesArray.forEach(image => {
        const { previewURL, likes, views, largeImageURL } = image;
        result.innerHTML +=
            `
       <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
            <img class="w-full" src="${previewURL}">
            <div class="p-4">
                <p class="font-light"><span class="font-bold">Likes: </span>${likes}</p>
                <p class="font-light"><span class="font-bold">Views: </span>${views}</p>

                <a class="block w-full bg-blue-800 hover:bg-blue-500 uppercase font-bold text-center text-white rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer"> See Image
                </a>
            </div>
       </div>
       `
    });
    // Clean child
    while(paginationDiv.firstChild) {
        paginationDiv.removeChild(paginationDiv.firstChild)
    }
    showPagesIterator();
}

function showPagesIterator() {
    iterator = createPages(totalPages);
    console.log(iterator.next().done);

    while(true) {
        const {value, done} = iterator.next();
        if(done) {
            return;
        } else { // create button for each element
            const buttonPage = document.createElement('a');
            buttonPage.href = '#';
            buttonPage.dataset.page = value;
            buttonPage.textContent = value;
            buttonPage.classList.add('next', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-5', 'rounded');
            buttonPage.onclick = () => {
                actualPage = value;
                searchImages();
            }
            paginationDiv.appendChild(buttonPage);
        }
    }
}