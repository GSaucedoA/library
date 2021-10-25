class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  get info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

function cancel() {
  newBookForm.style.display = 'none';
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#pages-read').checked = false;
  editIndex = undefined;
}

function updateLocalStorage() {
  localStorage.setItem('db', JSON.stringify(myLibrary));
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  updateLocalStorage();
  const book = document.querySelector(`[data-index="${index}"]`);
  book.parentElement.removeChild(book);
}

function editBook(index) {
  newBookForm.style.display = 'block';
  editIndex = index;
  const book = myLibrary[editIndex];
  document.querySelector('#title').value = book.title;
  document.querySelector('#author').value = book.author;
  document.querySelector('#pages').value = book.pages;
  document.querySelector('#pages-read').checked = book.read;
}

function toggleRead(index) {
  const read = myLibrary[index].read;
  myLibrary[index].read = !read;
  updateLocalStorage();
}

function populateHTML() {
  if (localStorage.getItem('db')) {
    myLibrary = JSON.parse(localStorage.getItem('db'));
  }

  for (let i = 0; i < myLibrary.length; i++) {
    addBookToHTML(myLibrary[i], i);
  }
}

function addBookToLibrary() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#pages-read').checked;
  if (editIndex == undefined) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addBookToHTML(newBook, myLibrary.length - 1);
  } else {
    myLibrary[editIndex].title = title;
    myLibrary[editIndex].author = author;
    myLibrary[editIndex].pages = pages;
    myLibrary[editIndex].read = read;
    editHTMLBook(editIndex, myLibrary[editIndex]);
  }
  updateLocalStorage();
  cancel();
}

function bookFromObject({ title, author, pages, read }, index) {
  const article = document.createElement('article');
  article.classList.add('book');
  article.dataset.index = index;
  article.innerHTML = `
      <h2 class="book__header">${title}</h2>
      <div class="book__content">
        <p>Written by ${author}</p>
        <p>${pages} pages</p>
        <p>
          Mark as read
          <label class="switch">
            <input type="checkbox" ${
              read ? 'checked' : ''
            }/> <span class="slider round"> </span>
          </label>
        </p>
      </div>
      <div class="book__footer">
        <button class="book__footer--btn-primary">Edit</button
        ><button class="book__footer--btn-secondary">Remove</button>
      </div>
  `;
  return article;
}

function addBookToHTML(book, i) {
  main.appendChild(bookFromObject(book, i));
}

function editHTMLBook(index, book) {
  document.querySelector(`[data-index="${index}"]`).innerHTML = bookFromObject(
    book,
    index
  ).innerHTML;
}

let myLibrary = [];
const newBookForm = document.querySelector('.new-book-form');

myLibrary.push(
  new Book(
    "Harry Potter and the Philosopher's Stone",
    'J. K. Rowling',
    223,
    false
  )
);
myLibrary.push(
  new Book(
    'Harry Potter and the Chamber of Secrets',
    'J. K. Rowling',
    251,
    false
  )
);
myLibrary.push(
  new Book(
    'Harry Potter and the Prisoner of Azcaban',
    'J. K. Rowling',
    317,
    true
  )
);
const newBookButton = document.querySelector('#new-book');
newBookButton.addEventListener('click', function () {
  newBookForm.style.display = 'block';
  document.querySelector('#title').focus();
});

const cancelButton = document.querySelector('#cancel');
cancelButton.addEventListener('click', cancel);

const add = document.querySelector('#add');
add.addEventListener('click', addBookToLibrary);

const main = document.querySelector('.main');

main.addEventListener('click', function (e) {
  if (e.target.tagName == 'BUTTON') {
    const index = e.target.parentNode.parentNode.dataset.index;
    e.target.textContent == 'Edit' ? editBook(index) : removeBook(index);
  } else if (e.target.tagName == 'INPUT') {
    toggleRead(
      e.target.parentNode.parentNode.parentNode.parentNode.dataset.index
    );
  }
});
let editIndex = undefined;

populateHTML();
