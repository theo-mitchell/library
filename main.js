let myLibrary = [];

function Book(author,title) {
    this.author = author,
    this.title = title;
}

function addBookToLibrary(event) {
    // Get all data and reset the form. 
    let author = bookForm.elements['author'].value;
    let title = bookForm.elements['title'].value;
    // Form is reset manually because it is prevented from refreshing the page by onsubmit="return false" in HTML
    bookForm.reset();
    
    let book = new Book(author, title)
    myLibrary.push(book);
    console.log(myLibrary);
    bookDisplay.textContent += book.title;

    // for (obj of myLibrary) {
    //     bookDisplay.textContent += obj.title;
    // }

}


const bookDisplay = document.getElementById('bookDisplay');
const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit',addBookToLibrary);
