const addBook = document.querySelector('#add-book');
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function info() {
  const readMessage = this.read ? 'readed' : 'not read yet';
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readMessage}`;
};

function addBookToLibrary() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;

  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);

  console.log(myLibrary);
}

addBook.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
});
