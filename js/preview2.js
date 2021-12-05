import { render } from './utils.js';
import { saveFavouritesLS, getFavouritesLS, removeFromFavouritesLS, getCardLS } from './locaStorage.js';
import { data } from './index.js';

const addToFav = (btn, series = {}) => {
  const ticketIcon = "https://img.icons8.com/color/96/000000/starred-ticket.png";

  btn.addEventListener("click", (e) => {
    const favImg1 = document.createElement("img");
    const favImg2 = document.createElement("img");

    favImg1.setAttribute("src", ticketIcon);
    favImg2.setAttribute("src", ticketIcon);
    favImg1.setAttribute("class", "my-fav");
    favImg2.setAttribute("class", "my-fav");
    favImg1.setAttribute("width", "52px");
    favImg2.setAttribute("width", "60px");

    let record;
    record = data.filter((card) => card.id == e.currentTarget.id);

    saveFavouritesLS(record);
    const currentCardID = document.querySelector(`div[class="card grow"][id="${e.currentTarget.id}"]`) ;
    const currentPreview = document.querySelector(`div[class="hero-details"][id="${e.currentTarget.id}"]`);

    favImg2.setAttribute("id", e.currentTarget.id);
    currentPreview.removeChild(currentPreview.querySelector('.custom-btn.my-fav-btn'));
    currentPreview.appendChild(favImg2);
    currentCardID?.appendChild(favImg1);

    removeFromFav(currentPreview.querySelector('img.my-fav'));

  });
};


const removeFromFav = (btn) => {
  btn.addEventListener("click", (e) => {
    const addFavBtn = document.createElement("button");
    addFavBtn.setAttribute("class", "custom-btn my-fav-btn");
    addFavBtn.textContent = "Add to Fav";

    removeFromFavouritesLS(e.currentTarget.id);
    const currentCardID = document.querySelector(`div[class="card grow"][id="${e.currentTarget.id}"]`) ;
    const currentPreview = document.querySelector(`div[class="hero-details"][id="${e.currentTarget.id}"]`);
    
    addFavBtn.setAttribute("id", e.currentTarget.id);

    currentPreview.appendChild(addFavBtn);

    currentPreview.removeChild(currentPreview.querySelector(`img`));

    currentCardID?.removeChild(document.querySelector(`div[id="${e.currentTarget.id}"] img.my-fav`));

    addToFav(currentPreview.querySelector('button.custom-btn.my-fav-btn'));
  }); 
}

const Preview = (series) => {

  const renderPreview = () => {

    let isFav = [];
    isFav = getFavouritesLS()?.map(x => x.id);

    const generateHTML = (record) => {
      
      const mobilePreview = record?.poster_path ? `https://image.tmdb.org/t/p/original/${record.poster_path}` : `./assets/404-error-page-not-found-m.jpeg`;
      const desktopPreview = record?.backdrop_path ? `https://image.tmdb.org/t/p/original/${record.backdrop_path}` : `./assets/404-error-page-not-found.jpeg`;
      
      let heroElement =
      `
      <div class="hero-bg">
      <picture>
      <source media="(min-width: 991px)" srcset="${desktopPreview}">
      <img src="${mobilePreview}">
      </picture>
      </div>
      <div class="hero-details" id=${record.id}>
      <h2>${record.name}</h2>
      <p ${record.overview.length > 300 ? `class="truncate"` : ``} >${record.overview}</p>
      <button class="custom-btn details" id=${record.id}>Details</button>
      ${ isFav?.includes(record.id) 
        ? `<img class="my-fav" id=${record.id} src="https://img.icons8.com/color/96/000000/starred-ticket.png" width="60px"/>`
        : `<button class="custom-btn my-fav-btn" id=${record.id}>Add to Fav</button>` }     
        </div>
        `;
        return heroElement;
    }
      
    const hero = document.querySelector(".container-hero");
    const heroNext = document.querySelector(".container-hero.next");
    const heroNext2 = document.querySelector(".container-hero.next2");
    const heroPrev = document.querySelector(".container-hero.prev");
    const heroPrev2 = document.querySelector(".container-hero.prev2");
    
    series.current ? render(hero,`${generateHTML(series.current)}`) : null;
    series.next ? render(heroNext,`${generateHTML(series.next)}`) : null;
    series.next2 ? render(heroNext2,`${generateHTML(series.next2)}`) : null;
    series.prev ? render(heroPrev,`${generateHTML(series.prev)}`) : null;
    series.prev2 ? render(heroPrev2,`${generateHTML(series.prev2)}`) : null;
  }

  renderPreview();

  let detailsBtn = document.querySelectorAll('.custom-btn.details');
  detailsBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      location.href = `./tv-series.html?id=${e.currentTarget.id}`;
    });
  });




  // const addToFav = (btn) => {
  //   btn.addEventListener("click", (e) => {
  //     const favImg1 = document.createElement("img");
  //     const favImg2 = document.createElement("img");

  //     favImg1.setAttribute("src", ticketIcon);
  //     favImg2.setAttribute("src", ticketIcon);
  //     favImg1.setAttribute("class", "my-fav");
  //     favImg2.setAttribute("class", "my-fav");
  //     favImg1.setAttribute("width", "52px");
  //     favImg2.setAttribute("width", "60px");

  //     let record;
  //     switch (parseInt(e.currentTarget.id)) {
  //       case parseInt(series.current.id):
  //         record = series.current;
  //         break;
  //       case parseInt(series.next.id):
  //         record = series.next;
  //         break;
  //       case parseInt(series.next2.id):
  //         record = series.next2;
  //         break;
  //       case parseInt(series.prev.id):
  //         record = series.prev;
  //         break;
  //       case parseInt(series.prev2.id):
  //         record = series.prev2;
  //         break;
  //     }

  //     saveFavouritesLS(record);
  //     const currentCardID = document.querySelector(`div[class="card grow"][id="${e.currentTarget.id}"]`) ;
  //     const currentPreview = document.querySelector(`div[class="hero-details"][id="${e.currentTarget.id}"]`);

  //     favImg2.setAttribute("id", e.currentTarget.id);
  //     currentPreview.removeChild(currentPreview.querySelector('.custom-btn.my-fav-btn'));
  //     currentPreview.appendChild(favImg2);
  //     currentCardID?.appendChild(favImg1);

  //     removeFromFav(currentPreview.querySelector('img.my-fav'));

  //   });
  // };


  // const removeFromFav = (btn) => {
  //   btn.addEventListener("click", (e) => {
  //     const addFavBtn = document.createElement("button");
  //     addFavBtn.setAttribute("class", "custom-btn my-fav-btn");
  //     addFavBtn.textContent = "Add to Fav";

  //     removeFromFavouritesLS(e.currentTarget.id);
  //     const currentCardID = document.querySelector(`div[class="card grow"][id="${e.currentTarget.id}"]`) ;
  //     const currentPreview = document.querySelector(`div[class="hero-details"][id="${e.currentTarget.id}"]`);
      
  //     addFavBtn.setAttribute("id", e.currentTarget.id);

  //     currentPreview.appendChild(addFavBtn);

  //     currentPreview.removeChild(currentPreview.querySelector(`img`));

  //     currentCardID?.removeChild(document.querySelector(`div[id="${e.currentTarget.id}"] img.my-fav`));

  //     addToFav(currentPreview.querySelector('button.custom-btn.my-fav-btn'));
  //   }); 
  // }

  let myFavouritesBtn = document.querySelectorAll('.custom-btn.my-fav-btn');
  myFavouritesBtn?.forEach((button) => addToFav(button, series)); 
  
  let myFavouritesRemoveBtn = document.querySelectorAll('img.my-fav');
  myFavouritesRemoveBtn?.forEach((button) => removeFromFav(button));
  
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

export { Preview, renderWelcome, addToFav, removeFromFav }