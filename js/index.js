import { List } from './list.js';
import { Preview } from './preview.js';

import { renderWelcome } from './preview.js';
import { fetchMoviesList } from './tmdbapi.js';

export let data = [];

const renderMoviesList = (data) => {
    List(data);
    let cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.addEventListener("click", (e) => {
            Preview(data, e.currentTarget.id);
            location.href='#preview';
        });
    });
};

const renderCards = () => {
    fetchMoviesList(currentPage).then((result) => {
        data = result; 
        renderMoviesList(result); });
}

document.addEventListener("DOMContentLoaded", () => {
    // renderWelcome();
    renderCards();   
});

const next = document.querySelector('.arrow.rgt');
const prev = document.querySelector('.arrow.lft');
let currentPage = 1;

next.addEventListener('click', () => {
    currentPage++; 
    renderCards();
});

prev.addEventListener('click', () => {
    currentPage > 1 ? currentPage-- : null; 
    renderCards();
});