
const savePageLS = (page = 1) => {
    localStorage.setItem("pageNum", page);
}
const getPageLS = () => {
    return localStorage.getItem("pageNum");
}

const saveCardLS = (card) => {
    localStorage.setItem("lastCard", card);
}

const getCardLS = () => {
    return localStorage.getItem("lastCard");
}

const saveFavouritesLS = (id) => {
    let myF;
    
    localStorage.getItem("myFavourites") 
        ? myF = JSON.parse(localStorage.getItem("myFavourites"))
        : myF = [];

    myF.push(id)
    localStorage.setItem("myFavourites", JSON.stringify(myF));
}

const getFavouritesLS = () => {
    return JSON.parse(localStorage.getItem("myFavourites"));
}

const removeFromFavouritesLS = (id) => {
    let myfavs = getFavouritesLS().filter(value => value != id )
    localStorage.setItem("myFavourites", JSON.stringify(myfavs));
}

export { savePageLS, getPageLS, saveCardLS, getCardLS, saveFavouritesLS, getFavouritesLS, removeFromFavouritesLS }