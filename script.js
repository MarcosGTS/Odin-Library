const addBook = document.querySelector('#add-book');
const popupBtn = document.querySelector('#popup-btn');

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
];

function bookToNode(book) {
  const bookNode = document.createElement('div');
  const contendNode = document.createElement('div');
  const removeBtn = document.createElement('button');
  const readBtn = document.createElement('button');

  contendNode.innerHTML = `
    <div class='card-front'>
      <h3 class="title">${book.title}</h3>
      <div class="author"><span>by</span> ${book.author}</div>
      <div class="num-pages">${book.pages}</div>
    </div>
  `;

  bookNode.classList.add('book');
  contendNode.classList.add('card-content');

  if (book.read) bookNode.classList.add('read');

  removeBtn.addEventListener('click', () => {
    myLibrary = myLibrary.filter((el) => el !== book);
    bookNode.remove();
  });

  readBtn.addEventListener('click', () => {
    bookNode.classList.toggle('read');
    book.toggleRead();
  });

  removeBtn.classList.add('rm-btn');
  readBtn.classList.add('read-btn');

  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  readBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');

  cardBack.appendChild(removeBtn);
  cardBack.appendChild(readBtn);

  contendNode.appendChild(cardBack);

  bookNode.appendChild(contendNode);
  bookNode.dataset.title = book.title;

  return bookNode;
}

function displayBooks() {
  myLibrary.forEach((book) => {
    const bookshelf = document.querySelector('#bookshelf');
    const htmlBooks = [...bookshelf.childNodes];
    const hasBook = htmlBooks.some((htmlBook) => htmlBook.dataset.title === book.title);
    const node = bookToNode(book);
    if (!hasBook) {
      bookshelf.appendChild(node);
    }
  });

  const inputList = document.querySelectorAll('.book .rm-btn');

  inputList.forEach((input) => {
    input.addEventListener('click', displayBooks);
  });
}

function addBookToLibrary() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  const hasBook = myLibrary.some((book) => book.title === title);

  if (hasBook) return;

  myLibrary.push(new Book(title, author, pages, read));
  displayBooks();
}

addBook.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
});

// popup logic
const modal = document.querySelector('#book-modal');

modal.addEventListener('click', (e) => {
  const targetId = e.target.id;

  if (['book-modal', 'add-book'].includes(targetId)) {
    modal.classList.remove('showing');
    modal.classList.add('hiding');
  }

  modal.addEventListener('animationend', () => {
    modal.classList.add('hide');
    modal.classList.remove('hiding');
  }, { once: true });
});

popupBtn.addEventListener('click', () => {
  modal.classList.remove('hide');
  modal.classList.add('showing');
});

displayBooks();
