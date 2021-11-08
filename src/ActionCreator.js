import {
    UPDATE_RANDOM_JOKE,
    UPDATE_SEARCH,
    UPDATE_RANDOM_CATEGORIE_JOKE,
    UPDATE_CATEGORIES,
  } from "./action";
  
  function updateRandomJoke(payload) {
    return { type: UPDATE_RANDOM_JOKE, payload };
  }

  function updateCategorieJoke(payload) {
    return { type: UPDATE_RANDOM_CATEGORIE_JOKE, payload };
  }
  
  function updateCategories(payload) {
      return { type: UPDATE_CATEGORIES, payload}
  }

  function updateSearchJokes(payload) {
    return { type: UPDATE_SEARCH, payload };
  }

  export function getRandomJoke() {
    return function (dispatch) {
       fetch("https://api.chucknorris.io/jokes/random")
        .then((data) => data.json())
        .then((data) => dispatch(updateRandomJoke([data])))
        .catch((err) => console.log(err))
    };
  }

  export function getCategorieJoke(categorie) {
    return function (dispatch) {
        fetch(`https://api.chucknorris.io/jokes/random?category=${categorie}`)
        .then((data) => data.json())
        .then((data) => dispatch(updateCategorieJoke([data])))
        .catch((err) => console.log(err))
    };
  } 
  
  export function getCategories() {
    return function (dispatch) {
        fetch("https://api.chucknorris.io/jokes/categories")
        .then((data) => data.json())
        .then((data) => dispatch(updateCategories(data)))
        .catch((err) => console.log(err))
    };
  }

  export function getSearchJokes(search) {
    return function (dispatch) {
      fetch(`https://api.chucknorris.io/jokes/search?query=${search}`)
        .then((data) => data.json())
        .then((data) => dispatch(updateSearchJokes(data.result)))
        .catch((err) => console.log(err))
    };
  }
  

  

  