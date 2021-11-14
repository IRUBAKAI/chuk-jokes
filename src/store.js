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
    search: " ",
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
    case "setSearch": {
      return { ...state, search: action.payload };
    }
    case "setCurrentPage": {
      return { ...state, currentPage: action.payload };
    }
    default: {
      return state;
    }
  }
}
function errorReducer(state = { errorSearch: "" }, action) {
  switch (action.type) {
    case "setError": {
      return { ...state, errorSearch: action.payload };
    }
    default: {
      return state;
    }
  }
}

function favouriteReducer(
  state = { statusBurgerMenu: "unActive", favourites: [] },
  action
) {
  switch (action.type) {
    case "setStatusBurgerMenu": {
      return { ...state, statusBurgerMenu: action.payload };
    }
    case "setFavourites": {
      return { ...state, favourites: action.payload };
    }
    default: {
      return state;
    }
  }
}

function checkedReducer(state = { checkedRadio: 'random' }, action) {
  switch (action.type) {
    case "setCheckedRadio": {
      return { ...state, checkedRadio: action.payload };
    }
    default: {
      return state;
    }
  }
}

const store = createStore(
  combineReducers({
    reducer: reducer,
    checkedReducer: checkedReducer,
    favouriteReducer: favouriteReducer,
    errorReducer: errorReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
