import { getFavouritesLS, removeFromFavouritesLS } from './locaStorage.js';
import { addToFav, removeFromFav } from './preview2.js';
const myFavourites = () => {

    const viewFavourites = document.querySelector('.view-fav');

    viewFavourites?.addEventListener('click', () => {
        const modalFav = document.querySelector('.modal-fav');
        const containerFav = document.querySelector('.container-fav');
        let favs = getFavouritesLS();
        while (containerFav.firstChild) {
            containerFav.removeChild(containerFav.firstChild);
        }

        favs.forEach((fav) => {
            const deletItem = document.createElement(`img`);
            const favItem = document.createElement(`p`);
            const favItemText = document.createElement(`span`);

            favItem.setAttribute('class', 'my-fav-item');
            favItem.setAttribute('id', fav.id);

            deletItem.setAttribute('id', fav.id);
            deletItem.setAttribute('class', "delete-my-fav");
            deletItem.setAttribute('width', "15px");
            deletItem.setAttribute('src', "https://img.icons8.com/fluency-systems-filled/48/ffffff/filled-trash.png");
            favItemText.textContent = fav.name;

            favItem.appendChild(favItemText);
            favItem.appendChild(deletItem);
            containerFav.append(favItem);

            favItemText.addEventListener("click", () => {
                location.href = `./tv-series.html?id=${fav.id}`;
            });

            deletItem.addEventListener("click", () => {
                removeFromFavouritesLS(fav.id);

                const currentCardID = document.querySelector(`div[class="card grow"][id="${fav.id}"]`) ;
                currentCardID?.removeChild(currentCardID.querySelector(`div[id="${fav.id}"] img.my-fav`));
                containerFav.removeChild(favItem);
                
                const currentPreview = document.querySelector(`div[class="hero-details"][id="${fav.id}"]`);
                const addFavBtn = document.createElement("button");
                addFavBtn.setAttribute("class", "custom-btn my-fav-btn");
                addFavBtn.textContent = "Add to Fav";
                addFavBtn.setAttribute("id", fav.id);
                currentPreview?.appendChild(addFavBtn);
                currentPreview?.removeChild(currentPreview.querySelector(`.hero-details img`));

                addToFav(currentPreview.querySelector('button.custom-btn.my-fav-btn'));
                document.querySelectorAll('.my-fav-item').length ? null : modalFav.classList.toggle("hidden");

            });
        })
        
        modalFav.classList.toggle("hidden");
    });
}

export { myFavourites }