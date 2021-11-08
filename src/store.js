import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  UPDATE_RANDOM_JOKE,
  UPDATE_SEARCH,
  UPDATE_RANDOM_CATEGORIE_JOKE,
  UPDATE_CATEGORIES,
} from "./action";
import thunk from "redux-thunk";

function reducer(
  state = {
    joke: [],
    categories: [],
    categorie: " ",
    status: 0,
    search: " ",
    favourites: [],
    checkedRandomInput: false,
    checkedCategoriesInput: false,
    checkedSearchInput: false,
    currentPage: 1,
  },
  action
) {
  switch (action.type) {
    case UPDATE_RANDOM_JOKE: {
      return { ...state, joke: action.payload };
    }
    case UPDATE_RANDOM_CATEGORIE_JOKE: {
      return { ...state, joke: action.payload };
    }
    case UPDATE_CATEGORIES: {
      return { ...state, categories: action.payload };
    }
    case UPDATE_SEARCH: {
      return { ...state, joke: action.payload };
    }
    case "getCategorie": {
      return { ...state, categorie: action.payload };
    }
    case "setStatus": {
      return { ...state, status: action.payload };
    }
    case "setSearch": {
      return { ...state, search: action.payload };
    }
    case "setFavourites": {
      return { ...state, favourites: action.payload };
    }
    case "setCurrentPage": {
      return { ...state, currentPage: action.payload };
    }
    default: {
      return state;
    }
  }
}

function checkedReducer(
  state = {
    checkedRandomInput: false,
    checkedCategoriesInput: false,
    checkedSearchInput: false,
  },
  action
) {
  switch (action.type) {
    case "setCheckedRandomInput": {
      return { ...state, checkedRandomInput: action.payload };
    }
    case "setCheckedCategorieInput": {
      return { ...state, checkedCategoriesInput: action.payload };
    }
    case "setCheckedSearchInput": {
      return { ...state, checkedSearchInput: action.payload };
    }
    default: {
      return state
    }
  }
}

const store = createStore(combineReducers({reducer: reducer, checkedInput: checkedReducer}), applyMiddleware(thunk));

export default store;
