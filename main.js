let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author,
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function makeABookForDisplay(book){
    let bookDiv = document.createElement('div');
    bookDiv.id = "book";
    const text = `Author: ${book.author} \nTitle: ${book.title}\n Pages: ${book.pages}\n Read: ${book.read}`;
    bookDiv.innerText = text;
    bookDiv.style.backgroundColor = getRandomColor();

    return bookDiv;
}

function addBookToLibrary(event) {
    // Get all data and reset the form. 
    let author = bookForm.elements['author'].value;
    let title = bookForm.elements['title'].value;
    let pages = bookForm.elements['pages'].value;
    let read = bookForm.elements['read'].checked;
    // Form is reset manually because it is prevented from refreshing the page by onsubmit="return false" in HTML
    bookForm.reset();
    toggleForm();

    let book = new Book(author, title, pages, read);
    myLibrary.push(book);
    console.log(myLibrary);

    bookDisplay.appendChild(makeABookForDisplay(book));

}

function toggleForm(){
    bookForm.classList.toggle("hidden");
}

const bookDisplay = document.getElementById('bookDisplay');

const addBookButton = document.getElementById('openForm');
addBookButton.addEventListener('click', toggleForm);

const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit',addBookToLibrary);
