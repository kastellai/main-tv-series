import { render } from './utils.js';
import { saveFavouritesLS, getFavouritesLS } from './locaStorage.js';

const Preview = (record) => {

  const mobilePreview = record.poster_path ? `https://image.tmdb.org/t/p/original/${record.poster_path}` : `./assets/404-error-page-not-found-m.jpeg`;
  const desktopPreview = record.backdrop_path ? `https://image.tmdb.org/t/p/original/${record.backdrop_path}` : `./assets/404-error-page-not-found.jpeg`;

  const heroElement =
  `
    <div class="hero-bg">
      <picture>
          <source media="(min-width: 991px)" srcset="${desktopPreview}">
          <img src="${mobilePreview}">
      </picture>
    </div>
      <div class="hero-details">
          <h2>${record.name}</h2>
          <p class=${record.overview.length > 550 ? "truncate" : null} >${record.overview}</p>
          <button class="custom-btn details" id=${record.id}>Details</a>
          <span />
          <button class="custom-btn my-fav-btn" id=${record.id}>Add to Fav</a>
      </div>
  `;

  const hero = document.querySelector(".container-hero");
  render(hero,`${heroElement}`);

  let detailsBtn = document.querySelectorAll('.custom-btn.details');
  detailsBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      location.href = `./tv-series.html?id=${e.currentTarget.id}`;
    });
  });

  const favImg = document.createElement("img");
  favImg.setAttribute("src", "https://img.icons8.com/color/96/000000/starred-ticket.png");
  favImg.setAttribute("class", "my-fav");
  favImg.setAttribute("width", "52px");

  let myFavouritesBtn = document.querySelectorAll('.custom-btn.my-fav-btn');
  myFavouritesBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      getFavouritesLS().includes(e.currentTarget.id) 
        ? null 
        : saveFavouritesLS(e.currentTarget.id);
        const currentCardID = document.querySelector(`div[id="${e.currentTarget.id}"]`) ;
        currentCardID.appendChild(favImg)
      });
  });
}

const renderWelcome = () => {
  const heroElement =
  `
    <div class="hero-bg" style="background-color: black; color: white; font-size:68px; text-align:center; height:550px;">
    The Best Of
    </div>
  `;
  const hero = document.querySelector(".container-hero");
  render(hero,`${heroElement}`);
}

export { Preview, renderWelcome }
