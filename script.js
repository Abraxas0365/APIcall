const apiUrl = "books.json";

const button = document.querySelector("button");
const container = document.getElementById("container");
const header = document.getElementById("header");

let booksVisible = false;

button.addEventListener("click", toggleBooks);

async function toggleBooks() {
  if (!booksVisible) {
    // Show books
    await fetchBooks();
    container.classList.add("show"); 
    header.classList.add("show");
    button.textContent = "Hide Books";
    button.classList.remove("big");
    booksVisible = true;
  } else {
    // Hide books
    container.classList.remove("show");
    header.classList.remove("show");
    setTimeout(() => {
      button.classList.add("big");
    }, 300);
    container.innerHTML = "";
    button.textContent = "Show Books";
    booksVisible = false;
  }
}

async function fetchBooks() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);

    container.innerHTML = "";

    // Loop over each book in the JSON array
    data.forEach((book) => {
      const title = book.title || "Untitled";
      const author = book.authors
        ? book.authors.map((a) => a.name).join(", ")
        : "Unknown";

      const publisher = book.publisher
        ? `${book.publisher.name} (${book.publisher.location})`
        : "Unknown";

      const year = book.year || "N/A";
      const pages = book.details?.pages || "N/A";
      const isbn = book.details?.isbn || "N/A";
      const categories = book.categories
        ? book.categories.slice(0, 5).join(", ")
        : "N/A";

      const online = book.details?.availability?.online ? "Yes" : "No";
      const library = book.details?.availability?.library ? "Yes" : "No";

      container.innerHTML += `
        <div class="card">
          <h2 class="title">${title}</h2>
          <ul class="list">
            <li><b>Author:</b> ${author}</li>
            <li><b>Publisher:</b> ${publisher}</li>
            <li><b>Year:</b> ${year}</li>
            <li><b>Pages:</b> ${pages}</li>
            <li><b>ISBN:</b> ${isbn}</li>
            <li><b>Categories:</b> ${categories}</li>
            <li><b>Online:</b> ${online}</li>
            <li><b>Library:</b> ${library}</li>
          </ul>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}
