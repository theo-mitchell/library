let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author,
    this.title = title;
    this.pages = pages;
    this.read = read;
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

    //Using delete and not splice to preserve id uniqueness. 
    delete myLibrary[bookToDelete.dataset.id];
    bookToDelete.remove();
    console.log(myLibrary);
}

function makeABookForDisplay(book){
    let bookDiv = document.createElement('div');
    bookDiv.id = "book";
    bookDiv.style.backgroundColor = getRandomColor();

    //We know that the book we are making for display is always neccecarily the last one in the array. 
    //Hence, this works as a simple way to get it's id.
    let bookId = myLibrary.length - 1;
    bookDiv.setAttribute("data-id", bookId);

    const closeIcon = document.createElement('span');
    closeIcon.classList.add("fas");
    closeIcon.classList.add("fa-window-close");
    closeIcon.classList.add("deleteBook");
    closeIcon.addEventListener('click', deleteBook);

    const text = document.createTextNode(`Author: ${book.author} \nTitle: ${book.title}\n Pages: ${book.pages}\n Read: ${book.read}`);
    bookDiv.append(closeIcon,text);

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
