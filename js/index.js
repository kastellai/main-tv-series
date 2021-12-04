import { List } from './list.js';
import { Preview } from './preview.js';
import { myFavourites } from './myFavourites.js';

import { savePageLS, getPageLS, getCardLS, saveCardLS, getFavouritesLS } from './locaStorage.js';
// import { renderWelcome } from './preview.js';
import { fetchMoviesList } from './tmdbapi.js';

export let data = [];

const renderMoviesList = (data) => {
    List(data);

    let cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.addEventListener("click", (e) => {
            const item = data.filter((card) => card.id == e.currentTarget.id);
            saveCardLS((JSON.stringify(item[0])));
            Preview(JSON.parse(getCardLS()));
            location.href='#';
        });
    });
};

const renderCards = () => {
    fetchMoviesList(getPageLS()).then((result) => {
        data = result; 
        renderMoviesList(result);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // renderWelcome();
    myFavourites();
    if (getCardLS()) {
        Preview(JSON.parse(getCardLS()));
    }
    renderCards();   
});

const next = document.querySelector('.arrow.rgt');
const prev = document.querySelector('.arrow.lft');
let currentPage = 1;

next.addEventListener('click', () => {
    getPageLS() ? currentPage = getPageLS(): null;
    currentPage++; 
    savePageLS(currentPage);
    renderCards();
});

prev.addEventListener('click', () => {
    currentPage = getPageLS();
    if (currentPage > 1) {
        currentPage--;
        savePageLS(currentPage);
        renderCards();
    }
});