import React, { useEffect } from "react";
import styles from "./Main.module.css";
import stylesJokeCard from "../JokeCard/JokeCard.module.css";
import stylesFavourite from "../JokeCard/FavouriteList.module.css";
import { CategorieBtn } from "../JokeCard/index";
import { JokeCard } from "../JokeCard/index";
import { Pagination } from "../Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategorieJoke,
  getCategories,
  getRandomJoke,
  getSearchJokes,
} from "../../ActionCreator";

function Main() {
  /// Pagination states
  const jokesPerPage = 5;

  //////////////////Redux SELECTOR

  const joke = useSelector((state) => state.reducer.joke);
  const categories = useSelector((state) => state.reducer.categories);
  const categorie = useSelector((state) => state.reducer.categorie);
  const status = useSelector((state) => state.reducer.status);
  const search = useSelector((state) => state.reducer.search);
  const favourites = useSelector((state) => state.reducer.favourites);
  const checkedRandomInput = useSelector(
    (state) => state.checkedInput.checkedRandomInput
  );
  const checkedCategoriesInput = useSelector(
    (state) => state.checkedInput.checkedCategoriesInput
  );
  const checkedSearchInput = useSelector(
    (state) => state.checkedInput.checkedSearchInput
  );
  const currentPage = useSelector((state) => state.reducer.currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function handleRandomJokeAdd() {
    if (checkedRandomInput.checked) {
      dispatch(getRandomJoke());
      dispatch({ type: "setStatus", payload: 1 });
    }
    if (checkedCategoriesInput.checked) {
      dispatch(getCategorieJoke(categorie));
      dispatch({ type: "setStatus", payload: 3 });
    }
    if (checkedSearchInput.checked) {
      dispatch(getSearchJokes(search));
    }
  }

  /// LOCALSTORAGE Buttons

  function handleAddToLocalStorage(joke) {
    const newFavouriteList = [...favourites, joke];
    const saveToLocalStorage = (joke) => {
      localStorage.setItem("joke-to-favourite", JSON.stringify(joke));
    };

    dispatch({ type: "setFavourites", payload: newFavouriteList });
    saveToLocalStorage(newFavouriteList);
  }

  function handleOnClickRemove(joke) {
    const newFavouriteList = favourites.filter((favourite) => {
      return favourite.id !== joke.id;
    });
    const saveToLocalStorage = (joke) => {
      localStorage.setItem("joke-to-favourite", JSON.stringify(joke));
    };
    dispatch({ type: "setFavourites", payload: newFavouriteList });
    saveToLocalStorage(newFavouriteList);
  }

  useEffect(() => {
    const jokeFavourites =
      JSON.parse(localStorage.getItem("joke-to-favourite")) || [];
    dispatch({ type: "setFavourites", payload: jokeFavourites });
  }, [dispatch]);

  /// FETCH REQUEST

  /// Get current Jokes

  const indexOfLastJoke = currentPage * jokesPerPage;
  const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;
  const currentJokes = joke.slice(indexOfFirstJoke, indexOfLastJoke);
  const howManyPages = Math.ceil(joke.length / jokesPerPage);

  return (
    <div className={styles.main_sec}>
      <div className={styles.content}>
        <h3>MSI 2021</h3>
        <div className={styles.title}>
          <h1>Hey!</h1>
          <h2>Let’s try to find a joke for you:</h2>
        </div>
        <form className={styles.checkbox_block}>
          <label>
            <input
              type="radio"
              name="name1"
              onChange={(event) =>
                {dispatch({
                  type: "setCheckedRandomInput",
                  payload: event.target,
                }); dispatch({ type: "setStatus", payload: 0 })}
              }
            />
            Random
          </label>

          <label>
            <input
              type="radio"
              name="name1"
              onChange={(event) =>
                {dispatch({
                  type: "setCheckedCategorieInput",
                  payload: event.target,
                }); dispatch({ type: "setStatus", payload: 2 })}
              }
            />
            From categories
          </label>

          <div
            className={
              status === 3
                ? styles.categorie_btns_block
                : status === 2
                ? styles.categorie_btns_block
                : styles.unActive
            }
          >
            {categories.map((categorie) => (
              <CategorieBtn categorie={categorie} />
            ))}
          </div>

          <label>
            <input
              type="radio"
              name="name1"
              onChange={(event) =>
                {dispatch({
                  type: "setCheckedSearchInput",
                  payload: event.target,
                }); dispatch({ type: "setStatus", payload: 4 })}
              }
            />
            Search
          </label>

          {status === 4 ? (
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Free text search..."
              onChange={(event) =>
                dispatch({ type: "setSearch", payload: event.target.value })
              }
            />
          ) : null}

          <input
            type="button"
            className={styles.getJoke_btn}
            onClick={() => handleRandomJokeAdd()}
            value="Get a joke"
          />
        </form>

        <div>
          {currentJokes.map((joke) => {
            const isFavourite = Boolean(
              favourites.find((favouriteJoke) => favouriteJoke.id === joke.id)
            );
            function storageButtonsAddNRemove() {
              if (!isFavourite) {
                handleAddToLocalStorage(joke);
              } else handleOnClickRemove(joke);
            }

            return (
              <JokeCard
                joke={joke}
                isFavourite={isFavourite}
                styles={stylesJokeCard}
                storageButtons={storageButtonsAddNRemove}
              />
            );
          })}
        </div>

        {currentJokes.length < 2 ? null : <Pagination pages={howManyPages} />}
      </div>

      <div className={stylesFavourite.favourite_block}>
        <h1>Favourite</h1>
        {favourites.map((favourite) => {
          function storageButtonRemove() {
            handleOnClickRemove(favourite);
          }
          return (
            <JokeCard
              joke={favourite}
              styles={stylesFavourite}
              storageButtons={storageButtonRemove}
            />
          );
        })}
      </div>
      </div>

  );
}

export default Main;
