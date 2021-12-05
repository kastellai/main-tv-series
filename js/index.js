import { List } from './list.js';
import { Preview } from './preview2.js';
import { myFavourites } from './myFavourites.js';

import { savePageLS, getPageLS, getCardLS, saveCardLS, getFavouritesLS } from './locaStorage.js';
// import { renderWelcome } from './preview.js';
import { fetchMoviesList } from './tmdbapi.js';

export let data = [];

const renderMoviesList = (data) => {
    List(data);

    let cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener("click", (e) => {
            let series = {};

            series.current = data[index];
            
            if (index > 0) {
                series.prev =  data[index-1];
            }
            if (index > 1) {
                series.prev2  = data[index-2];
            }

            if (index < data.length-1) {
                series.next = data[index+1];
            }
            if (index < data.length) {
                series.next2 = data[index+2];
            }
            saveCardLS(JSON.stringify(series));
            Preview(series);
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