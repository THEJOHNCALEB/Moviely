//written by (https://github.com/johnocaleb), API by (https://themoviedb.org)
var currentYear = new Date().getFullYear();
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1',
     TOP_API_URL = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1',
     API_KEY = "?api_key=3fd2be6f0c70a2a598f084ddfb75487c",
     SINGLE_API_URL_FIRST = 'https://api.themoviedb.org/3/movie/',
     SINGLE_API_URL_SECOND = '?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=en-US',
     YEAR_API_URL = 'https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year='+currentYear+'&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1',
     IMG_PATH = 'https://image.tmdb.org/t/p/w1280',
     SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="',
     searchbtn = document.querySelector("#searchbtn"),
     searchlay = document.querySelector("#search-overlay"),
     singlelay = document.querySelector("#single-overlay"),
     searchBtnMobile = document.querySelector("#searchBtnMobile"),
     closeSearchBtn = document.querySelector("#closeSearchBtn"),
     closeSingleMovie = document.querySelector("#closeSingleMovie"),
     mobilemenu = document.querySelector("#mobile-menu"),
     moviecontainer = document.querySelector("#movie-container"),
     mobileoverlay = document.querySelector("#mobileoverlay"),
     searchresultheader = document.querySelector("#searchresultheader"),
     main = document.getElementById('main'),
     body = document.querySelector('body'),
     topMovieCurrentYearCover = document.querySelector('#topMovieCurrentYearCover'),
     popularMovieCover = document.querySelector('#popularMovieCover'),
     topMovieCover = document.querySelector('#topMovieCover'),
     search = document.getElementById('search'),
     closeMobileOverlay = document.querySelector("#closeMobileOverlay");
    searchbtn.addEventListener("click", toogleoverlay);
    searchBtnMobile.addEventListener("click", toogleoverlay);
    closeSearchBtn.addEventListener("click", toogleoverlay);
    closeSingleMovie.addEventListener("click", toogleSingleView);
    mobilemenu.addEventListener("click", tooglemobilemenu);
    mobileoverlay.addEventListener("click", tooglemobilemenu);
    getPopularMovies(API_URL);
    getTopMovies(TOP_API_URL);
    getTopMoviesOfCurrentYear(YEAR_API_URL);
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
            document.querySelector("#singleMovieGenres").innerHTML = " ";
            document.querySelector("#movieProductionCompanies").innerHTML = " ";
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
    async function getTopMovies(url) {
        const res = await fetch(url)
        const data = await res.json()
        showTopMovies(data.results)
    }
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
        movies.genres.forEach((genre) => {
            const movieGenres = document.createElement('span')
            movieGenres.textContent = genre.name;
            document.querySelector("#singleMovieGenres").appendChild(movieGenres)
        })
        movies.production_companies.forEach((production_company) => {
            const movieCompanyImg = document.createElement('img')
            movieCompanyImg.classList.add('singleCompanyImg', 'h-20');
            movieCompanyImg.src = IMG_PATH+production_company.logo_path;
            document.querySelector("#movieProductionCompanies").appendChild(movieCompanyImg)
        })
        document.querySelector("#movieOverview").textContent = movies.original_title.toUpperCase();
        document.querySelector("#singleMovieFullOverview").textContent = movies.overview;
        document.querySelector("#singleMovieTagline").textContent = movies.tagline.toUpperCase();
        document.querySelector("#singleMovieWebsite").href = movies.homepage;
        document.querySelector("#singleMovieReleaseDate").textContent = movies.release_date;
        document.querySelector("#singleMovieBudget").textContent = movies.budget;
        document.querySelector("#singleMovieRating").textContent = Math.round(movies.vote_average);
        document.querySelector("#singleMovieRating").className = "";
        document.querySelector("#singleMovieRating").classList.add(getClassByRate(movies.vote_average));
        document.querySelector("#singleMovieStatus").textContent = movies.status.toUpperCase();
        document.querySelector("#singleMovieOverview").style.backgroundImage = "url("+IMG_PATH + movies.backdrop_path+")";
        document.querySelector("#singleMoviePoster").style.backgroundImage = "url("+IMG_PATH + movies.poster_path+")";
        toogleSingleView()
    }
    function getClassByRate(vote) {
        if(vote >= 8) {
            return 'gold'
        } else if(vote >= 5) {
            return 'silver'
        } else {
            return 'red'
        }
    }