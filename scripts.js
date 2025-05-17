// Array to hold book objects
const books = [
  { title: "1984", author: "George Orwell", genre: "fiction", available: true },
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "nonfiction", available: false },
  { title: "Dune", author: "Frank Herbert", genre: "scifi", available: true },
];

// DOM references
const bookList = document.getElementById('book-list');
const addBookForm = document.getElementById('add-book-form');
const genreFilter = document.getElementById('genre-filter');
const availabilityFilter = document.getElementById('availability-filter');

// Render books based on filters
function renderBooks() {
  bookList.innerHTML = ''; // clear

  // Filter books based on filter values
  const filteredBooks = books.filter(book => {
    const genreMatch = genreFilter.value === 'all' || book.genre === genreFilter.value;
    const availabilityMatch = availabilityFilter.value === 'all' || 
      (availabilityFilter.value === 'available' && book.available) ||
      (availabilityFilter.value === 'unavailable' && !book.available);
    return genreMatch && availabilityMatch;
  });

  // Inject books into DOM
  for (let book of filteredBooks) {
    const article = document.createElement('article');
    article.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Genre: ${book.genre}</p>
      <p>Status: ${book.available ? "Available" : "Unavailable"}</p>
    `;
    bookList.appendChild(article);
  }
}

// Add new book from form input
function addBook(event) {
  event.preventDefault();

  const title = event.target.title.value.trim();
  const author = event.target.author.value.trim();
  const genre = event.target.genre.value;
  const available = event.target.available.checked;

  if (title && author && genre) {
    books.push({ title, author, genre, available });
    renderBooks();
    addBookForm.reset();
  } else {
    alert("Please fill in all fields.");
  }
}

// Event listeners
addBookForm.addEventListener('submit', addBook);
genreFilter.addEventListener('change', renderBooks);
availabilityFilter.addEventListener('change', renderBooks);

// Initial render
renderBooks();