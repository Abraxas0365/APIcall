const apiUrl = "https://openlibrary.org/subjects/love.json?limit=10";

const button = document.querySelector("button");
const container = document.getElementById("container");
const title = document.getElementById("title");

let booksVisible = false;

button.addEventListener("click", toggleBooks);

async function toggleBooks() {
  if (!booksVisible) {
    // Show books
    await fetchBooks();
    container.classList.add("show"); 
    title.classList.add("show");
    button.textContent = "Hide Books";
    button.classList.remove("big");
    booksVisible = true;
  } else {
    // Hide books
    container.classList.remove("show");
    title.classList.remove("show");
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

    container.innerHTML = "";

    data.works.forEach((book) => {
      const title = book.title;
      const author = book.authors
        ? book.authors.map((a) => a.name).join(", ")
        : "Unknown";
      const publishYear = book.first_publish_year || "N/A";
      const availabilityStatus = book.availability
        ? book.availability.status
        : "Unknown";
      const subject = book.subject
        ? book.subject.slice(0, 5).join(", ")
        : "N/A";

      container.innerHTML += `
      <div class="card">
        <h1 class="title">${title}</h1>
        <ul class="list">
          <li><b>Author:</b> ${author}</li>
          <li><b>Publish Year:</b> ${publishYear}</li>
          <li><b>Availability:</b> ${availabilityStatus}</li>
          <li><b>Subjects:</b> ${subject}</li>
        </ul>
      </div>
      `;
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}
