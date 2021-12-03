import { render } from './utils.js';

const Preview = (data, id) => {
  const item = data.filter((card) => card.id == id)
  const mobilePreview = `https://image.tmdb.org/t/p/original/${item[0].poster_path}`;
  const desktopPreview = `https://image.tmdb.org/t/p/original/${item[0].backdrop_path}`;

  const heroElement =
  `
    <div class="hero-bg">
      <picture>
          <source media="(min-width: 991px)" srcset="${desktopPreview}">
          <img src="${mobilePreview}">
      </picture>
    </div>
      <div class="hero-details">
          <h2>${item[0].name}</h2>
          <p class=${item[0].overview.length > 550 ? "truncate" : null} >${item[0].overview}</p>
          <button class="custom-btn" id=${item[0].id}>Details</a>
      </div>
  `;

  const hero = document.querySelector(".container-hero");
  render(hero,`${heroElement}`);

  let detailsBtn = document.querySelectorAll('.custom-btn');
  detailsBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
          location.href = `./tv-series.html?id=${e.currentTarget.id}`;
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
