//written by (https://github.com/johnocaleb), API by (https://themoviedb.org)
var currentYear = new Date().getFullYear();
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const TOP_API_URL = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const YEAR_API_URL = 'https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year='+currentYear+'&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const searchbtn = document.querySelector("#searchbtn");
const searchlay = document.querySelector("#search-overlay");
const searchBtnMobile = document.querySelector("#searchBtnMobile");
const closeSearchBtn = document.querySelector("#closeSearchBtn");
const mobilemenu = document.querySelector("#mobile-menu");
const moviecontainer = document.querySelector("#movie-container");
const mobileoverlay = document.querySelector("#mobileoverlay");
const searchresultheader = document.querySelector("#searchresultheader");
const main = document.getElementById('main');
const body = document.querySelector('body');
const popularMovieCover = document.querySelector('#popularMovieCover');
const topMovieCover = document.querySelector('#topMovieCover');
const topMovieCurrentYearCover = document.querySelector('#topMovieCurrentYearCover');
const form = document.getElementById('form');
const search = document.getElementById('search');
const closeMobileOverlay = document.querySelector("#closeMobileOverlay");

//event listener
    searchbtn.addEventListener("click", toogleoverlay);
    searchBtnMobile.addEventListener("click", toogleoverlay);
    closeSearchBtn.addEventListener("click", toogleoverlay);
    mobilemenu.addEventListener("click", tooglemobilemenu);
    mobileoverlay.addEventListener("click", tooglemobilemenu);

    getPopularMovies(API_URL);
    getTopMovies(TOP_API_URL);
    getTopMoviesOfCurrentYear(YEAR_API_URL);
    //for search bar 
    search.addEventListener("input",()=>{
        const searchTerm = search.value
        if(searchTerm && searchTerm !== '') {
            getMovies(SEARCH_API + searchTerm)
        }
        else {
            moviecontainer.innerHTML = ''
            searchresultheader.textContent = "";
        }
    })

    function toogleoverlay() {
        if (searchlay.classList.contains("hidden")) {
            searchlay.classList.remove("hidden");
            searchlay.classList.add("block");
            body.classList.add("overflow-none");
        } else if (searchlay.classList.contains("block")) {
            searchlay.classList.remove("block");
            searchlay.classList.add("hidden");
            body.classList.remove("overflow-none");
        }
    }

    function tooglemobilemenu() {
        if (mobileoverlay.classList.contains("hidden")) {
            mobileoverlay.classList.remove("hidden");
            mobileoverlay.classList.add("block");
        } else if (mobileoverlay.classList.contains("block")) {
            mobileoverlay.classList.remove("block");
            mobileoverlay.classList.add("hidden");
        }
    }

    async function getMovies(url) {
        const res = await fetch(url)
        const data = await res.json()
        showMovies(data.results)
    }

    function showMovies(movies) {
        moviecontainer.innerHTML = ''
        searchresultheader.textContent = "Search Results:";
        movies.forEach((movie) => {
            const { title, poster_path, vote_average, overview } = movie
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            movieEl.innerHTML = `
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>
            `
            moviecontainer.appendChild(movieEl)
        })
    }

    async function getPopularMovies(url) {
        const res = await fetch(url)
        const data = await res.json()
        showPopularMovies(data.results)
    }
    //for popular movies
    function showPopularMovies(movies) {
        popularMovieCover.innerHTML = ''
        movies.forEach((movie) => {
            const { title, poster_path, vote_average, overview } = movie
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            movieEl.innerHTML = `
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>
            `
            popularMovieCover.appendChild(movieEl)
        })
    }

    async function getTopMovies(url) {
        const res = await fetch(url)
        const data = await res.json()
        showTopMovies(data.results)
    }
//for top movies
    function showTopMovies(movies) {
        topMovieCover.innerHTML = ''
        movies.forEach((movie) => {
            const { title, poster_path, vote_average, overview } = movie

            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            
            movieEl.innerHTML = `
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>
            `
            topMovieCover.appendChild(movieEl)
        })
    }

    async function getTopMoviesOfCurrentYear(url) {
        const res = await fetch(url)
        const data = await res.json()
        showTopMoviesOfCurrentYear(data.results)
    }
//for trending movies
    function showTopMoviesOfCurrentYear(movies) {
        topMovieCurrentYearCover.innerHTML = ''
        movies.forEach((movie) => {
            const { title, poster_path, vote_average, overview } = movie

            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            
            movieEl.innerHTML = `
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
            <h3>Overview</h3>
            ${overview}
            </div>
            `
            topMovieCurrentYearCover.appendChild(movieEl)
        })
    }
// to switch colors of votes
    function getClassByRate(vote) {
        if(vote >= 8) {
            return 'gold'
        } else if(vote >= 5) {
            return 'silver'
        } else {
            return 'red'
        }
    }