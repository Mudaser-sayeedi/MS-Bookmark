const addBookmarkContainer = document.querySelector('#addBookmark-container');
const modelOverlay = document.querySelector('#model-overlay');
const closeModel = document.querySelector('#close-model');


const showModel = () => {
    modelOverlay.classList.add('show-overlay');
}

const close = () => {
    modelOverlay.classList.remove('show-overlay');
}

addBookmarkContainer.addEventListener('click', showModel);
closeModel.addEventListener('click',close);
