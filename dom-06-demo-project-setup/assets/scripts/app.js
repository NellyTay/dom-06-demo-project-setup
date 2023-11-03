const addMovieModal = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancalAddMovieBtn = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieBtn = cancalAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const movies = [];
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById('delete-modal');


const cancelMovieDeletion = () => {
  toggleBackdrop()
  deleteMovieModal.classList.remove('visible')
}

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
}

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const clearInputs = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const cancelAddMovie = () => {
  closeMovieModal();
  clearInputs();
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  clearInputs();
  cancelMovieDeletion();
  toggleBackdrop();
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }

 
  movies.splice(movieIndex, 1);
  cancelMovieDeletion();
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();

  updateUI();
  
};

const deleteMovieHandler = (movieId) => {
  
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionBtn.removeEventListener('click',cancelMovieDeletion)

  cancelDeletionBtn.addEventListener('click', cancelMovieDeletion)
  confirmDeletionBtn.addEventListener('click',deleteMovie.bind(null,movieId));
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values!");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearInputs();
  updateUI();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
};

startAddMovieBtn.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancalAddMovieBtn.addEventListener("click", cancelAddMovie);
confirmAddMovieBtn.addEventListener("click", addMovieHandler);
