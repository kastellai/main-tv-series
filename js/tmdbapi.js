import { APIendpoint, bearToken,  } from './utils.js';

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + bearToken);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const fetchMoviesList = async (page = 1) => {
    const popularList = `/tv/popular?page=${page}`;
    return fetch(APIendpoint + popularList, requestOptions)
        .then(response => response.json())
        .then(result => {
            return (result.results);
        })
        .catch(error => console.log('error', error));
}

const fetchMovieDetails = async (id) => {
    return fetch(APIendpoint + `/tv/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return (result);
        })
        .catch(error => console.log('error', error));
}

const fetchMovieVideos = async (id) => {
    return fetch(APIendpoint + `/tv/${id}/videos`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return (result);
        })
        .catch(error => console.log('error', error));
}

const fetchMovieImages = async (id) => {
    return fetch(APIendpoint + `/tv/${id}/images`, requestOptions)
        .then(response => response.json())
        .then(result => {
            return (result);
        })
        .catch(error => console.log('error', error));
}

export { fetchMoviesList, fetchMovieDetails, fetchMovieVideos, fetchMovieImages }