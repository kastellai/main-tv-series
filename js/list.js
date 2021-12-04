import { getFavouritesLS } from './locaStorage.js';
import { render } from './utils.js';

const List = (data) => {
    const elements = data
      .map(
        (item) => `
        <div class="card" id=${item.id} style="background-image: url('https://image.tmdb.org/t/p/w200/${item.poster_path}');">
          <div class="card-details">
            <p>rate: ${item.vote_average}</p>
          </div>
        ${ getFavouritesLS().includes(item.id.toString()) 
          ? `<img class="my-fav" src="https://img.icons8.com/color/96/000000/starred-ticket.png" width="52px"/>`
          : `` }
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