let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author,
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(event) {
    // Get all data and reset the form. 
    let author = bookForm.elements['author'].value;
    let title = bookForm.elements['title'].value;
    let pages = bookForm.elements['pages'].value;
    let read = bookForm.elements['read'].checked;
    // Form is reset manually because it is prevented from refreshing the page by onsubmit="return false" in HTML
    bookForm.reset();
    
    let book = new Book(author, title, pages, read);
    myLibrary.push(book);
    console.log(myLibrary);

    let bookDiv = document.createElement('div');
    bookDiv.id = "book";
    const text = `Author: ${book.author} \nTitle: ${book.title}\n Pages: ${book.pages}\n Read: ${book.read}`;
    bookDiv.innerText = text;
    bookDisplay.appendChild(bookDiv);
    // bookDisplay.textContent += book.title;
}


const bookDisplay = document.getElementById('bookDisplay');
const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit',addBookToLibrary);
