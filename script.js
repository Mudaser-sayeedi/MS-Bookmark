// dom elements selection
const addBookmarkContainer = document.querySelector('#addBookmark-container');
const modelOverlay = document.querySelector('#model-overlay');
const closeModel = document.querySelector('#close-model');
const form = document.querySelector('form');
const nameElement = document.querySelector('#nameElement');
const urlElement = document.querySelector('#urlElement');
const bookmarkContainer = document.querySelector('#bookmark-container');

// gloabal variables
let bookmarks = {};





const createElement = (name, url) => {
    const div = document.createElement('div');
    div.classList.add('bookmark-item');
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-xmark', 'close');
    icon.title = 'close';
    icon.setAttribute('onclick',`delBookmark('${url}')`);
    const div2 = document.createElement('div');
    div2.classList.add('name');
    const img = document.createElement('img');
    img.src = `https://www.google.com/s2/favicons?domain=${url}`;
    img.alt = 'favicon';
    const span = document.createElement('span');
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.textContent = name;
    anchor.target = '_blank';
    // now insert each created element togather
    span.append(anchor);
    div2.append(img, span);
    div.append(icon, div2);
    bookmarkContainer.append(div);
}

const fetchBookmarks = () => {
    bookmarkContainer.textContent = '';
    const obj = {
        name: 'Google',
        url:'https://www.google.com'
    }
    bookmarks[obj.url] = obj;
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    const saved = JSON.parse(localStorage.getItem('bookmarks'));
    for (const key in saved) {
        bookmarks = saved;
        const name = saved[key].name;
        const url = saved[key].url;
        createElement(name,url);
    }
}


const showModel = () => {
    modelOverlay.classList.add('show-overlay');
    nameElement.focus();
}


const validateForm = (name, url) => {
    // cleate pattern for  url regular expression
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    // check if is user input the name or the url
    if (!name) {
        alert('please enter the Name');
        nameElement.focus();
        return false;
    }else if (!url) {
        alert('please enter the URL');
        urlElement.focus();
        return false;
    }
    // check if user input the http or https infont of url input
    if (!url.includes('http://www.') && !url.includes('https://www.') ) {
        url = `https://www.${urlElement.value}`
    }

    // if (url.match(regex)) {
        
    // }
    // check if the url not match the regular expression
    if (!url.match(regex)) {
        alert('please enter valid URL');
        urlElement.focus();
        return false;
    }
    return true;
}

const submitForm = (e) => {
    e.preventDefault();
    const name = nameElement.value;
    let url = urlElement.value;
    if (validateForm(name, url)) {
        const id = url;
        const bookmark = {
            name,
            url
        }
        bookmarks[id]  = bookmark;
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        modelOverlay.classList.remove('show-overlay');
        form.reset();
        fetchBookmarks();
    }
    
}

const delBookmark = (url) => {
    if (bookmarks[url]) {
        delete bookmarks[url];
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

// event listeners 
addBookmarkContainer.addEventListener('click', showModel);
closeModel.addEventListener('click', () => modelOverlay.classList.remove('show-overlay'));
form.addEventListener('submit',submitForm);
window.addEventListener('click', (e) => e.target.id === 'model-overlay' ? modelOverlay.classList.remove('show-overlay') : false);

fetchBookmarks();