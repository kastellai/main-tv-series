import { render } from './utils.js';

const Preview = (data, id) => {
  const item = data.filter((card) => card.id == id)

  const heroElement =
  `
    <div class="hero-bg" style="background-image: url('https://image.tmdb.org/t/p/original/${item[0].backdrop_path}');">
        <div class="hero-details">
            <h2>${item[0].name}</h2>
            <p>${item[0].overview.length > 600 ? item[0].overview.substring(0,600)+"..." : item[0].overview }</p>
            <button class="custom-btn" id=${item[0].id}>Details</a>
        </div>
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
