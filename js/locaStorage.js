
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

const saveFavouritesLS = (records) => {
    let myF;
    localStorage.getItem("myFavourites") 
        ? myF = JSON.parse(localStorage.getItem("myFavourites"))
        : myF = [];
    records.forEach(x => myF.push(x))
    localStorage.setItem("myFavourites", JSON.stringify(myF));
}

const getFavouritesLS = () => {
    return JSON.parse(localStorage.getItem("myFavourites"));
}

const removeFromFavouritesLS = (id) => {
    let myfavs = getFavouritesLS().filter(value => parseInt(value.id) != parseInt(id) )
    localStorage.setItem("myFavourites", JSON.stringify(myfavs));
}

export { savePageLS, getPageLS, saveCardLS, getCardLS, saveFavouritesLS, getFavouritesLS, removeFromFavouritesLS }