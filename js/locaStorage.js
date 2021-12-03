

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

const saveFavouritesLS = () => {}
const getFavouritesLS = () => {}

export { savePageLS, getPageLS, saveCardLS, getCardLS }