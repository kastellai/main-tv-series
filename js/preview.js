import { render } from './utils.js';
import { saveFavouritesLS, getFavouritesLS, removeFromFavouritesLS } from './locaStorage.js';

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
          <button class="custom-btn details" id=${record.id}>Details</button>
          ${ getFavouritesLS()?.includes(record.id.toString()) 
            ? `<img class="my-fav" id=${record.id} src="https://img.icons8.com/color/96/000000/starred-ticket.png" width="60px"/>`
            : `<button class="custom-btn my-fav-btn" id=${record.id}>Add to Fav</button>` }
          
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

  const favImg1 = document.createElement("img");
  const favImg2 = document.createElement("img");
  const addFavBtn = document.createElement("button");
  addFavBtn.setAttribute("class", "custom-btn my-fav-btn");
  addFavBtn.textContent = "Add to Fav"

  favImg1.setAttribute("src", "https://img.icons8.com/color/96/000000/starred-ticket.png");
  favImg2.setAttribute("src", "https://img.icons8.com/color/96/000000/starred-ticket.png");
  favImg1.setAttribute("class", "my-fav");
  favImg2.setAttribute("class", "my-fav");
  favImg1.setAttribute("width", "52px");
  favImg2.setAttribute("width", "60px");


  let myFavouritesBtn = document.querySelector('.custom-btn.my-fav-btn');
  myFavouritesBtn?.addEventListener("click", (e) => {
    saveFavouritesLS(e.currentTarget.id);
    
    const currentCardID = document.querySelector(`div[id="${e.currentTarget.id}"]`) ;
    const currentPreview = document.querySelector(`.hero-details`) ;
    favImg2.setAttribute("id", e.currentTarget.id);
    
    currentPreview.removeChild(document.querySelector('.custom-btn.my-fav-btn'))
    currentPreview.appendChild(favImg2);
    currentCardID?.appendChild(favImg1);
  }); 



  let myFavouritesRemoveBtn = document.querySelector('img.my-fav');
  myFavouritesRemoveBtn?.addEventListener("click", (e) => {
      removeFromFavouritesLS(e.currentTarget.id);
      const currentCardID = document.querySelector(`div[id="${e.currentTarget.id}"]`) ;
      const currentPreview = document.querySelector(`.hero-details`);
      addFavBtn.setAttribute("id", e.currentTarget.id);
      currentPreview.appendChild(addFavBtn)
      currentPreview.removeChild(document.querySelector(`.hero-details img`));
      currentCardID?.removeChild(document.querySelector(`div[id="${e.currentTarget.id}"] img.my-fav`));
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
