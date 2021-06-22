let myLibrary = [];

function Book(author,title) {
    this.author = author,
    this.title = title;
}

function addBookToLibrary() {
    let books = ['one', 'two', 'three'];

    for (book of books) {
       myLibrary.push(new Book('test',book));
    }

    for (obj of myLibrary) {
        console.log(obj.title)
        console.log(obj.author);
    }
}

addBookToLibrary();