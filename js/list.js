import { render } from './utils.js';

const List = (data) => {
    const elements = data
      .map(
        (item) => `
        <div class="card" id=${item.id} style="background-image: url('https://image.tmdb.org/t/p/w200/${item.poster_path}');">
          <div class="card-details">
            <p>rate: ${item.vote_average}</p>
          </div>
        </div>`
      )
      .join("");
  
    const container = document.querySelector(".container-cards");
    render(
      container,
      `
      ${elements}
      `
    );
}

export { List }