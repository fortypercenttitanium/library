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
        card.innerHTML =
            `<h1> ${this.title} <h1>
            <h2>by ${this.author} </h2>
            <p>${this.pages} pages long</p>
            <p>Read: ${this.haveRead}</p>`
        card.appendChild(this.button)
        if (locationBefore) {
            container.insertBefore(card, locationBefore);
        }
        else {
            container.appendChild(card)
        }
    }
}
const modal = document.querySelector('.modal')
const newBookButton = document.querySelector('.newbook');
newBookButton.addEventListener('click', () => {
    modal.style.display = 'block';
})

const newBookSubmit = document.querySelector('.submit');
newBookSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    let newBook = new Book(document.forms[0].title.value, document.forms[0].author.value, document.forms[0].pages.value, document.querySelector('#haveRead').checked)
    newBook.render();
    modal.style.display = 'none';
})

const book1 = new Book('The Hobbit', 'JRR Tolkien', 310, true)
const book2 = new Book("Ender's Game", 'Orton Scott Card', 324, true)
const book3 = new Book('Dune', 'Frank Herbert', 412, true)

let myLibrary = [book1, book2, book3];

myLibrary.forEach(book => book.render())