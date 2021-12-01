import { fetchMovieDetails, fetchMovieVideos, fetchMovieImages } from './tmdbapi.js';
import { render } from './utils.js';

const Details = async (id = 0) => {
    let trailerID = '';
    let imagesID = [];

    await fetchMovieVideos(id).then((result) => {
        result.results.length > 0 
        ? trailerID = result.results[0].key
        : trailerID = 'cmEge4Y6pUs';
    });

    await fetchMovieImages(id).then((result) => {
        result.backdrops.length > 4 
        ? imagesID = result.backdrops.slice(0,4)
        : imagesID = result.backdrops;
    });

    await fetchMovieDetails(id).then((result) => {
        const container = document.querySelector(".container-movie-details");
        let listImgs = '';
        
        imagesID.forEach(img => 
            listImgs += `<img src = "https://image.tmdb.org/t/p/w300/${img.file_path}"/>`
        );
        render(
            container,
            `
            <h1 class="movie-details-title">${result.name}</h1>
            <div class="videoWrapper">
                <iframe src="https://www.youtube.com/embed/${trailerID}"
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
                gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <p class="movie-details-description">${result.overview}</p>
            <div class="movie-details-scenes"> 
                ${listImgs}
            </div>
            <div class="flex-btn-container">
                <button class="custom-btn" id="back">Torna alla home</button>
            </div>`
        );

        const goHomePage = document.querySelector('#back');
        goHomePage.addEventListener('click', () => location.href = './index.html')
    }); 
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieID = urlParams.get('id');

document.addEventListener("DOMContentLoaded", () => {
    Details(movieID); 
});

export { Details };