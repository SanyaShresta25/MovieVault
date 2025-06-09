const userProfiles = [
    {
        id: 0,
        name: "Sanya Shresta",
        age: 21,
        location: "Udupi, Karnataka",
        bio: "Film enthusiast and indie movie lover",
        avatar: "SC",
        joinDate: "2023",
        favoriteGenres: ["Fantasy", "Animation", "Adventure"]
    },
    {
        id: 1,
        name: "Aameena Nada",
        age: 20,
        location: "Ras Al Khaimah, UAE",
        bio: "Sci-fi and action movie collector",
        avatar: "AN",
        joinDate: "2022",
        favoriteGenres: ["Sci-Fi", "Drama"]
    },
    {
        id: 2,
        name: "Shawn Bengher",
        age: 22,
        location: "Bengaluru, Karnataka",
        bio: "Classic cinema and drama enthusiast",
        avatar: "SB",
        joinDate: "2024",
        favoriteGenres: ["Romance", "Drama"]
    }
];

const defaultMovies = [
    [
        {
            title: "Barbie: The Princess and The Popstar",
            year: 2012,
            director: "Zeke Norton",
            genre: "Fantasy, Musical",
            rating: 8.5,
            image: "https://i.pinimg.com/originals/70/f6/a8/70f6a8ef3109333190ab722c1ee1683b.gif"
        },
        {
            title: "Guardians of the Galaxy",
            year: 2014,
            director: "James Gunn",
            genre: "Sci‑Fi, Adventure, Action, Fantasy, Comedy",
            rating: 8.2,
            image: "https://i.pinimg.com/originals/e5/a7/6a/e5a76a4ae11f6d8bd3cfd641027a5447.gif"
        },
        {
            title: "3 Idiots",
            year: 2009,
            director: "Rajkumar Hirani",
            genre: "Comedy, Drama",
            rating: 9.0,
            image: "https://i.pinimg.com/736x/c4/48/74/c44874bf16763c2187b6a9d89ee3bcbf.jpg"
        }
    ],
    [
        {
            title: "Barbie and the Diamond Castle",
            year: 2008,
            director: "Gino Nichele",
            genre: "Fantasy, Musical",
            rating: 8.1,
            image: "https://i.pinimg.com/736x/7a/50/f7/7a50f70b34963fb3fbcc1bc315dd5983.jpg"
        },
        {
            title: "Bulbbul",
            year: 2020,
            director: "Anvita Dutt",
            genre: "Horror, Thriller, Fantasy",
            rating: 7.5,
            image: "https://i.pinimg.com/736x/75/19/69/75196998912bde48311b2cc4fa39b927.jpg"
        },
        {
            title: "Powerpuff Girls",
            year: 2002,
            director: "Craig McCracken",
            genre: "Animation, Action, Comedy",
            rating: 7.4,
            image: "https://i.pinimg.com/originals/a1/ff/40/a1ff4080c27fcd4066cf6aa876b233b5.gif"
        }
    ],
    [
        {
            title: "Pokemon",
            year: 1998,
            director: "Kunihiko Yuyama",
            genre: "Animation, Adventure, Family",
            rating: 7.6,
            image: "https://i.pinimg.com/originals/e8/f0/fd/e8f0fd891e5edcaf8f338a6c76fd00c4.gif"
        },
        {
            title: "October",
            year: 2018,
            director: "Shoojit Sircar",
            genre: "Romance, Drama",
            rating: 8.0,
            image: "https://i.pinimg.com/736x/2f/49/a5/2f49a56ce35d4f6a7268f937826689d2.jpg"
        },
        {
            title: "Mufasa: The Lion King",
            year: 2024,
            director: "Barry Jenkins",
            genre: "Animation, Adventure, Drama",
            rating: 8.0,
            image: "https://i.pinimg.com/736x/4f/b6/41/4fb64114361c806843bfa863d063df48.jpg"
        }
    ]
];

// Utilities to handle LocalStorage
function saveMoviesToStorage() {
    localStorage.setItem("userMovies", JSON.stringify(userMovies));
}

function loadMoviesFromStorage() {
    const stored = localStorage.getItem("userMovies");
    return stored ? JSON.parse(stored) : defaultMovies;
}

// App state
let userMovies = loadMoviesFromStorage();
let currentUserIndex = null;
let currentUser = null;
let movies = [];

// DOM elements
const userSelector = document.querySelector('.user-selector');
const profileSection = document.getElementById('profileSection');
const moviesSection = document.getElementById('moviesSection');
const userName = document.getElementById('userName');
const userAge = document.getElementById('userAge');
const userLocation = document.getElementById('userLocation');
const userBio = document.getElementById('userBio');
const avatarText = document.getElementById('avatarText');
const totalMovies = document.getElementById('totalMovies');
const avgRating = document.getElementById('avgRating');
const favoriteGenre = document.getElementById('favoriteGenre');
const moviesGrid = document.getElementById('moviesGrid');
const addMovieForm = document.getElementById('addMovieForm');

// Initialize app
function initializeApp() {
    showUserSelector();
}

// User selector
function showUserSelector() {
    userSelector.style.display = 'block';
    profileSection.style.display = 'none';
    moviesSection.style.display = 'none';
    currentUserIndex = null;
    currentUser = null;
}

function switchUser(userIndex) {
    currentUserIndex = userIndex;
    currentUser = userProfiles[userIndex];
    movies = [...userMovies[userIndex]];

    userSelector.style.display = 'none';
    profileSection.style.display = 'block';
    moviesSection.style.display = 'block';

    displayUserProfile();
    displayMovies();
   
}

function displayUserProfile() {
    userName.textContent = currentUser.name;
    userAge.textContent = `Age: ${currentUser.age}`;
    userLocation.textContent = `Location: ${currentUser.location}`;
    userBio.textContent = `Bio: ${currentUser.bio}`;
    avatarText.textContent = currentUser.avatar;
}

function displayMovies() {
    if (movies.length === 0) {
        moviesGrid.innerHTML = `<div class="empty-state"><h4>No movies yet</h4><p>Add one!</p></div>`;
        return;
    }

    moviesGrid.innerHTML = '';
    movies.forEach((movie, index) => {
        moviesGrid.appendChild(createMovieCard(movie, index));
    });
}

function createMovieCard(movie, index) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const posterContent = movie.image
        ? `<img src="${movie.image}" alt="${movie.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div class="placeholder" style="display:none;">🎬</div>`
        : `<div class="placeholder">🎬</div>`;

    card.innerHTML = `
        <div class="movie-poster">
            ${posterContent}
            <button class="delete-btn" onclick="deleteMovie(${index})">×</button>
        </div>
        <div class="movie-info">
            <h4>${movie.title}</h4>
            <p>${movie.year} • ${movie.director}</p>
            <span class="movie-genre">${movie.genre}</span>
            <div class="movie-rating">★ ${movie.rating}</div>
        </div>
    `;
    return card;
}



function getMostCommonGenre() {
    const genreCounts = {};
    movies.forEach(movie => {
        movie.genre.split(',').forEach(g => {
            const trimmed = g.trim();
            genreCounts[trimmed] = (genreCounts[trimmed] || 0) + 1;
        });
    });
    const sorted = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
    return sorted.length ? sorted[0][0] : "None";
}

function showAddMovieForm() {
    addMovieForm.style.display = 'block';
    document.getElementById('movieTitle').focus();
}

function hideAddMovieForm() {
    addMovieForm.style.display = 'none';
    clearForm();
}

function clearForm() {
    ['movieTitle', 'movieYear', 'movieDirector', 'movieGenre', 'movieRating', 'movieImage'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

function addMovie() {
    const title = document.getElementById('movieTitle').value.trim();
    const year = parseInt(document.getElementById('movieYear').value);
    const director = document.getElementById('movieDirector').value.trim();
    const genre = document.getElementById('movieGenre').value;
    const rating = parseFloat(document.getElementById('movieRating').value);
    const image = document.getElementById('movieImage').value.trim();

    if (!title || !year || !director || !genre || !rating || rating < 1 || rating > 10 || year < 1900 || year > new Date().getFullYear()) {
        alert("Please enter valid movie data.");
        return;
    }

    const newMovie = { title, year, director, genre, rating, image };
    movies.push(newMovie);
    userMovies[currentUserIndex] = movies;
    saveMoviesToStorage();
    displayMovies();
   
    hideAddMovieForm();
    showMessage(`"${title}" has been added!`);
}

function deleteMovie(index) {
    if (confirm(`Delete "${movies[index].title}"?`)) {
        movies.splice(index, 1);
        userMovies[currentUserIndex] = movies;
        saveMoviesToStorage();
        displayMovies();
        
    }
}

function showMessage(msg) {
    alert(msg);
}

// Handle Enter key for form
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    const fields = ['movieTitle', 'movieYear', 'movieDirector', 'movieGenre', 'movieRating', 'movieImage'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        el?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addMovie();
        });
    });
});
