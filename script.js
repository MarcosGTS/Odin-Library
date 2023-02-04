const addBook = document.querySelector('#add-book');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function toggleRead() {
  this.read = !this.read;
};

let myLibrary = [
  new Book('Hobbit', 'Marcos', 100, true),
  new Book('Hobbit', 'Marcos', 100, false),
  new Book('Hobbit', 'Marcos', 100, true),
  new Book('Hobbit', 'Marcos', 100, true),
];

function bookToNode(book) {
  const bookNode = document.createElement('div');
  const removeBtn = document.createElement('button');
  const readBtn = document.createElement('button');

  bookNode.innerHTML = `
    <h3>${book.title}</h3>
    <div>${book.author}</div>
    <span>${book.pages}</span>
  `;

  bookNode.classList.add('book');
  if (book.read) bookNode.classList.add('read');

  removeBtn.addEventListener('click', () => {
    myLibrary = myLibrary.filter((el) => el !== book);
  });

  readBtn.addEventListener('click', () => book.toggleRead());

  bookNode.appendChild(removeBtn);
  bookNode.appendChild(readBtn);

  return bookNode;
}

function displayBooks() {
  const bookshelf = document.querySelector('#bookshelf');
  bookshelf.innerHTML = '';

  myLibrary.forEach((book) => {
    const node = bookToNode(book);
    bookshelf.appendChild(node);
  });

  const inputList = document.querySelectorAll('.book button');
  inputList.forEach((input) => {
    input.addEventListener('click', displayBooks);
  });

  console.log(myLibrary);
}

function addBookToLibrary() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;

  const newBook = new Book(title, author, pages, read);

  myLibrary.push(newBook);
  displayBooks();
}

addBook.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
});

displayBooks();
