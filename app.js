function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

function cancel() {
  newBookForm.style.display = "none";
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#pages-read").checked = false;
  editIndex = undefined;
}
function updateLocalStorage() {
  localStorage.setItem("db", JSON.stringify(myLibrary));
}
function removeBook() {
  myLibrary.splice(this.parentNode.parentNode.dataset.index, 1);
  updateLocalStorage();
  populateHTML(true);
}

function editBook() {
  newBookForm.style.display = "block";
  editIndex = this.parentNode.parentNode.dataset.index;
  const book = myLibrary[editIndex];
  document.querySelector("#title").value = book.title;
  document.querySelector("#author").value = book.author.author;
  document.querySelector("#pages").value = book.pages;
  document.querySelector("#pages-read").checked = book.read;
}

function toggleRead() {
  const index = this.parentNode.parentNode.parentNode.parentNode.dataset.index;
  const read = myLibrary[index].read;
  myLibrary[index].read = !read;
  updateLocalStorage();
}

function populateHTML(bol) {
  if (localStorage.getItem("db")) {
    myLibrary = JSON.parse(localStorage.getItem("db"));
  }
  if (bol) {
    main.textContent = "";
  }
  for (let i = 0; i < myLibrary.length; i++) {
    addBookToHTML(myLibrary[i], i);
  }
}

function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#pages-read").checked;
  if (editIndex == undefined) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addBookToHTML(newBook, myLibrary.length - 1);
  } else {
    myLibrary[editIndex].title = title;
    myLibrary[editIndex].author = author;
    myLibrary[editIndex].pages = pages;
    myLibrary[editIndex].read = read;
    populateHTML(true);
  }
  updateLocalStorage();
  cancel();
}

function addBookToHTML(book, i) {
  /*book__content*/
  const author = document.createElement("p");
  author.textContent = `Written by ${book.author}`;
  const pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = book.read;
  checkbox.addEventListener("click", toggleRead);

  const span = document.createElement("span");
  span.classList.add("slider");
  span.classList.add("round");

  const label = document.createElement("label");
  label.classList.add("switch");
  label.appendChild(checkbox);
  label.appendChild(span);

  const checkBoxContainer = document.createElement("p");
  checkBoxContainer.textContent = "Mark as read ";
  checkBoxContainer.appendChild(label);

  const book__content = document.createElement("div");
  book__content.classList.add("book__content");
  book__content.appendChild(author);
  book__content.appendChild(pages);
  book__content.appendChild(checkBoxContainer);
  /*end book__content
  book__header*/
  const book__header = document.createElement("h2");
  book__header.classList.add("book__header");
  book__header.textContent = book.title;
  /*end book__header 
  book__footer*/
  const book__footer = document.createElement("div");
  book__footer.classList.add("book__footer");

  const btn_primary = document.createElement("button");
  btn_primary.textContent = "Edit";
  btn_primary.classList.add("book__footer--btn-primary");
  btn_primary.addEventListener("click", editBook);

  const btn_secondary = document.createElement("button");
  btn_secondary.textContent = "Remove";
  btn_secondary.classList.add("book__footer--btn-secondary");
  btn_secondary.addEventListener("click", removeBook);

  book__footer.appendChild(btn_primary);
  book__footer.appendChild(btn_secondary);
  /*end book__footer */
  const bookContainer = document.createElement("article");
  bookContainer.classList.add("book");
  bookContainer.appendChild(book__header);
  bookContainer.appendChild(book__content);
  bookContainer.appendChild(book__footer);
  bookContainer.dataset.index = i;

  main.appendChild(bookContainer);
}

let myLibrary = [];
const newBookForm = document.querySelector(".new-book-form");

myLibrary.push(
  new Book(
    "Harry Potter and the Philosopher's Stone",
    "J. K. Rowling",
    223,
    false
  )
);
myLibrary.push(
  new Book(
    "Harry Potter and the Chamber of Secrets",
    "J. K. Rowling",
    251,
    false
  )
);
myLibrary.push(
  new Book(
    "Harry Potter and the Prisoner of Azcaban",
    "J. K. Rowling",
    317,
    true
  )
);
const newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click", function () {
  newBookForm.style.display = "block";
  document.querySelector("#title").focus();
});

const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", cancel);

const add = document.querySelector("#add");
add.addEventListener("click", addBookToLibrary);

const main = document.querySelector(".main");
let editIndex = undefined;

populateHTML();
