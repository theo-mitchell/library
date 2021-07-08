const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) ? JSON.parse(localStorage.getItem("myLibrary")) : [];
let bookId = myLibrary[myLibrary.length - 1] !== undefined ?  myLibrary[myLibrary.length - 1].id + 1 : 0;

const bookDisplay = document.getElementById('bookDisplay');

const addBookButton = document.getElementById('openForm');
addBookButton.addEventListener('click', toggleForm);

const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit',addBookToLibrary);

if (myLibrary.length > 0) {
    for (let i = 0; i < myLibrary.length; i++) {
        bookDisplay.appendChild(makeBookForDisplay(myLibrary[i]));
    }
}

class Book {
    constructor(id, author, title, pages, read, coverColor) {
        this.id = id;
        this.author = author,
        this.title = title;
        this.pages = pages;
        this.read = read;
        this.coverColor = coverColor;
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function deleteBook(event) {
    let bookToDelete = event.target.parentNode;

    let myLibraryIndexToDelete = myLibrary.findIndex(function(o){
        return o.id === parseInt(bookToDelete.dataset.id);
    });
    if (myLibraryIndexToDelete !== -1) myLibrary.splice(myLibraryIndexToDelete,1);

    bookToDelete.remove();
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function changeBookReadStatus(event) {
    let bookToChangeStatusOf = myLibrary.find(book => book.id === parseInt(event.target.dataset.id));
    bookToChangeStatusOf.read = bookToChangeStatusOf.read ? false : true;
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function makeBookForDisplay(book){
    let bookDiv = document.createElement('div');
    bookDiv.id = "book";
    bookDiv.style.backgroundColor = book.coverColor;
    bookDiv.setAttribute("data-id", book.id);

    const closeIcon = document.createElement('span');
    closeIcon.classList.add("fas");
    closeIcon.classList.add("fa-window-close");
    closeIcon.classList.add("deleteBook");
    closeIcon.addEventListener('click', deleteBook);

    let ul = document.createElement('ul');
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(`Author: ${book.author}`));
    ul.appendChild(li);

    li = document.createElement('li');
    li.appendChild(document.createTextNode(`Title: ${book.title}`));
    ul.appendChild(li);

    li = document.createElement('li');
    li.appendChild(document.createTextNode(`Pages: ${book.pages}`));
    ul.appendChild(li);

    let readStatusCheckbox = document.createElement("INPUT");
    readStatusCheckbox.setAttribute("type", "checkbox");
    readStatusCheckbox.checked = book.read;
    readStatusCheckbox.classList.add("readStatus");
    /*
        Adding an id to the checkbox as well.
        This is done for convenicence of changing a given book's read status
        It is possible to climb the DOM to the book div parent element and get it
        However, it would take more code then this and be far more complicated, so I think this is a more sensible choice
    */
    readStatusCheckbox.setAttribute("data-id", book.id);
    readStatusCheckbox.addEventListener('click', changeBookReadStatus);

    li = document.createElement('li');
    li.appendChild(document.createTextNode(`Read: `));
    li.appendChild(readStatusCheckbox);
    ul.appendChild(li);

    bookDiv.append(closeIcon,ul);

    return bookDiv;
}

function addBookToLibrary(event) {
    // Get all data and reset the form. 
    let author = bookForm.elements['author'].value;
    let title = bookForm.elements['title'].value;
    let pages = bookForm.elements['pages'].value;
    let read = bookForm.elements['read'].checked;
    let coverColor = getRandomColor();

    // Form is reset manually because it is prevented from refreshing the page by onsubmit="return false" in HTML
    bookForm.reset();
    toggleForm();

    let book = new Book(bookId,author, title, pages, read, coverColor);
    myLibrary.push(book);
    ++bookId;

    bookDisplay.appendChild(makeBookForDisplay(book));
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function toggleForm(){
    bookForm.classList.toggle("hidden");
}