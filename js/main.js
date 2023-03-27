//written by (https://github.com/johnocaleb), API by (https://themoviedb.org)
var currentYear = new Date().getFullYear();
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const TOP_API_URL = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const API_KEY = "?api_key=3fd2be6f0c70a2a598f084ddfb75487c";
//brake the single search url into two
//first
const SINGLE_API_URL_FIRST = 'https://api.themoviedb.org/3/movie/';
//second
const SINGLE_API_URL_SECOND = '?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US';
const YEAR_API_URL = 'https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year='+currentYear+'&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const searchbtn = document.querySelector("#searchbtn");
const searchlay = document.querySelector("#search-overlay");
const singlelay = document.querySelector("#single-overlay");
const searchBtnMobile = document.querySelector("#searchBtnMobile");
const closeSearchBtn = document.querySelector("#closeSearchBtn");
const closeSingleMovie = document.querySelector("#closeSingleMovie");
const mobilemenu = document.querySelector("#mobile-menu");
const moviecontainer = document.querySelector("#movie-container");
const mobileoverlay = document.querySelector("#mobileoverlay");
const searchresultheader = document.querySelector("#searchresultheader");
const main = document.getElementById('main');
const body = document.querySelector('body');
const topMovieCurrentYearCover = document.querySelector('#topMovieCurrentYearCover');
const popularMovieCover = document.querySelector('#popularMovieCover');
const topMovieCover = document.querySelector('#topMovieCover');
const search = document.getElementById('search');
const closeMobileOverlay = document.querySelector("#closeMobileOverlay");

//event listener
    searchbtn.addEventListener("click", toogleoverlay);
    searchBtnMobile.addEventListener("click", toogleoverlay);
    closeSearchBtn.addEventListener("click", toogleoverlay);
    closeSingleMovie.addEventListener("click", toogleSingleView);
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

    function toogleSingleView() {
        if (singlelay.classList.contains("hidden")) {
            singlelay.classList.remove("hidden");
            singlelay.classList.add("block");
            body.classList.add("overflow-none");
        } else if (singlelay.classList.contains("block")) {
            singlelay.classList.remove("block");
            singlelay.classList.add("hidden");
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
            const { title, id, poster_path, vote_average, overview } = movie
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            movieEl.innerHTML = `
            <div onclick="getSingleMovie(`+id+`)">
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
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
            const { title, id, poster_path, vote_average, overview } = movie
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            movieEl.innerHTML = `
                <div onclick="getSingleMovie(`+id+`)">
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            </div>
            `
            popularMovieCover.appendChild(movieEl)
        })
    }
{/* <div class="overview">
        <button onclick="getSingleMovie(`+id+`)" class="text-rose-400">View</button>
            <h3>Overview</h3>
            ${overview}
            </div> */}
    async function getTopMovies(url) {
        const res = await fetch(url)
        const data = await res.json()
        showTopMovies(data.results)
    }
//for top movies
    function showTopMovies(movies) {
        topMovieCover.innerHTML = ''
        movies.forEach((movie) => {
            const { title, id, poster_path, vote_average, overview } = movie

            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            
            movieEl.innerHTML = `
            <div onclick="getSingleMovie(`+id+`)">
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
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
            const { title, id, poster_path, vote_average, overview } = movie

            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
            
            movieEl.innerHTML = `
            <div onclick="getSingleMovie(`+id+`)">
                <img src="${IMG_PATH + poster_path}" alt="${title}">
                <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
            </div>
            `
            topMovieCurrentYearCover.appendChild(movieEl)
        })
    }

    async function getSingleMovie(url) {
        const res = await fetch(SINGLE_API_URL_FIRST+url+API_KEY)
        const data = await res.json()
        showSingleMovie(data);
    }
    function showSingleMovie(movies) {
        document.querySelector("#movieOverview").textContent = movies.original_title.toUpperCase();
        //movies.forEach((genres) => {})
        document.querySelector("#singleMovieFullOverview").textContent = movies.overview;
        document.querySelector("#singleMovieTagline").textContent = movies.tagline.toUpperCase();
        document.querySelector("#singleMovieWebsite").href = movies.homepage;
        document.querySelector("#singleMovieReleaseDate").textContent = movies.release_date;
        document.querySelector("#singleMovieBudget").textContent = movies.budget;
        document.querySelector("#singleMovieRating").textContent = Math.round(movies.vote_average*10/10);
        document.querySelector("#singleMovieRating").classList.add(getClassByRate(movies.vote_average));
        document.querySelector("#singleMovieStatus").textContent = movies.status.toUpperCase();
        document.querySelector("#singleMovieOverview").style.backgroundImage = "url("+IMG_PATH + movies.backdrop_path+")";
        document.querySelector("#singleMoviePoster").style.backgroundImage = "url("+IMG_PATH + movies.poster_path+")";
        toogleSingleView()
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