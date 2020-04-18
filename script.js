function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
        }
    }
     
const container = document.querySelector('.container');
 
class Book {
    constructor(title, author, pages, haveRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.haveRead = haveRead
        this.button = document.createElement('button');
        this.button.textContent = 'Toggle read status'
        this.button.addEventListener('click', (e) => {
            this.haveRead = !this.haveRead;
            const nextSib = e.currentTarget.parentNode.nextSibling;
            e.currentTarget.parentNode.remove();
            this.render(nextSib)
        })
    }
    info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead ? 'read' : 'not yet read'}`
    }
    //locationBefore is optional
    render = (locationBefore) => {
        const card = document.createElement('div')
        card.className = 'card'
        const deleteBook = document.createElement('button');
        deleteBook.textContent = 'Delete book';
        deleteBook.className = 'delete';
        deleteBook.addEventListener('click', e => {
            container.removeChild(e.currentTarget.parentNode);
        })
        card.innerHTML =
        `<h1> ${this.title} <h1>
        <h2>by ${this.author} </h2>
        <p>${this.pages} pages long</p>
        <p>Read: ${this.haveRead}</p>`
        card.appendChild(this.button)
        card.appendChild(deleteBook)
        if (locationBefore) {
            container.insertBefore(card, locationBefore);
        }
        else {
            container.appendChild(card)
        }
    }
}

const myLibrary = [];

if (storageAvailable('localStorage') && window.localStorage.hasOwnProperty('library')){
    console.log('storage avail and library exists')
    const tempLib = (JSON.parse(localStorage.library));
    tempLib.forEach(item => {
        const newBook = new Book(item['title'], item['author'], item['pages'], item['haveRead'])
        myLibrary.push(newBook);
    })
    myLibrary.forEach(book => book.render())
} else {
    console.log('no storage or lib doesnt exist');
}

const modal = document.querySelector('.modal')

const newBookButton = document.querySelector('.newbook');

newBookButton.addEventListener('click', () => {
    if (modal.style.display == 'block') {
        modal.style.display = 'none';
} else {
    modal.style.display = 'block';
}
})

const newBookSubmit = document.querySelector('.submit');

const validateForm = () => {
    if (!/[a-z0-9]+/gi.test(document.forms['newBookForm'].title.value)) {
        alert('Please give a valid title');
        return false;
    } else
    if (!/[a-z ]{3,}/i.test(document.forms['newBookForm'].author.value)) {
        alert('Please give a valid author');
        return false;
    } else
    if (!/\d+/.test(document.forms['newBookForm'].pages.value)) {
        alert('Please provide pages as a number');
        return false;
    } else
    if (!(document.querySelector('#haveRead').checked || document.querySelector('#haveNotRead').checked)) {
        alert('Please indicate if you have or have not read the book');
        return false;
    } else return true;
}

newBookSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateForm()){
        let newBook = new Book(document.forms['newBookForm'].title.value, document.forms['newBookForm'].author.value, document.forms['newBookForm'].pages.value, document.querySelector('#haveRead').checked)
        newBook.render();
        myLibrary.push(newBook);
        document.forms['newBookForm'].reset();
        modal.style.display = 'none';
        if (storageAvailable('localStorage')){
            localStorage.setItem('library', JSON.stringify(myLibrary));
        }
    }
})