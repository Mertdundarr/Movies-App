/*TMDB API Anahtarı */

const API_URl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f823639c62855843eec71fdb6700d721';

const IMG_Path = 'https://image.tmdb.org/t/p/w1280';

const Search_Url = 'https://api.themoviedb.org/3/search/movie?api_key=f823639c62855843eec71fdb6700d721&query="';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById("search");

/***************************************************/
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;
/*******************************************************/

getMovies(API_URl);

async function getMovies(url){
    const res =await fetch(url);
    const data =await res.json();
    console.log(data);

    showMovies(data.results);
    /******************************/
        currentPage = data.page;
        nextPage = currentPage +1;
        prevPage = currentPage -1;
        totalPages = data.total_pages;
    /******************************/
}

function showMovies(movies){

    main.innerHTML = '' ;

    movies.forEach((movie)=>{
        const { title, poster_path, vote_average,overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        
        
            <img src="${IMG_Path + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
                <div class="overview">
                ${overview}
            </div>   
       
        ` 

        main.appendChild(movieEl);
    });        
 
  /* Film Puanlaması*/
 }

 function getClassByRate(vote){
    if (vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return'orange'
    } else{
        return 'red'
    }    
} 
/* Formdan Aratma*/ 

 form.addEventListener('submit' ,(e)=>{
    e.preventDefault();

    const searchTerm =search.value;

    if(searchTerm && searchTerm !== ''){
        getMovies(Search_Url + searchTerm)
        search.value='';
    }else{
        window.location.reload() 

    }    
 });


 
 
/* dark mode */

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.navbar,.sidebar,.sidebar i,.toggle,.toggle-ball,.movie-list-filter select,.movie-list-title"
);

ball.addEventListener("click", function () {
  items.forEach((item) => item.classList.toggle("active"));
});




