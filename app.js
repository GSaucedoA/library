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
}

function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#pages-read").checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  populateHTML(newBook);
  cancel();
}

function populateHTML(book) {
  /*book__content*/
  const author = document.createElement("p");
  author.textContent = `Written by ${book.author}`;
  const pages = document.createElement("p");
  pages.textContent = `${book.pages} pages`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = book.read;

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
  const btn_secondary = document.createElement("button");
  btn_secondary.textContent = "Remove";
  btn_secondary.classList.add("book__footer--btn-secondary");

  book__footer.appendChild(btn_primary);
  book__footer.appendChild(btn_secondary);
  /*end book__footer */
  const article = document.createElement("article");
  article.classList.add("book");
  article.appendChild(book__header);
  article.appendChild(book__content);
  article.appendChild(book__footer);

  main.appendChild(article);
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
console.log(myLibrary);
newBookButton.addEventListener("click", function () {
  newBookForm.style.display = "block";
  document.querySelector("#title").focus();
});

const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", cancel);

const add = document.querySelector("#add");
add.addEventListener("click", addBookToLibrary);

const main = document.querySelector(".main");

myLibrary.forEach(populateHTML);
