import { render } from './utils.js';

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
          <button class="custom-btn" id=${record.id}>Details</a>
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
