import React, { useEffect } from "react";
import styles from "./Main.module.css";
import stylesJokeCard from "../JokeCard/JokeCard.module.css";
import stylesFavourite from "../JokeCard/FavouriteList.module.css";
import { JokeCard } from "../JokeCard/";
import { Pagination } from "../Pagination";
import { Form } from "../Form/";
import { BurgerMenu } from "../BurgerMenu"
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
  const search = useSelector((state) => state.reducer.search);
  const favourites = useSelector((state) => state.favouriteReducer.favourites);
  const currentPage = useSelector((state) => state.reducer.currentPage);
  const checkedRadio = useSelector(
    (state) => state.checkedReducer.checkedRadio
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function handleRandomJokeAdd() {
    if (checkedRadio === "random") {
      dispatch(getRandomJoke());
      dispatch({ type: "setStatus", payload: 1 });
    }
    if (checkedRadio === "categorie") {
      dispatch(getCategorieJoke(categorie));
      dispatch({ type: "setStatus", payload: 3 });
    }
    if (checkedRadio === "search") {
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

        <Form
          handleRandomJokeAdd={handleRandomJokeAdd}
          categories={categories}
          currentJokes={currentJokes}
        />

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

      {favourites.map((favourite) => (
        <BurgerMenu 
          styles={styles}
          stylesFavourite={stylesFavourite}
          favourite={favourite}
          handleOnClickRemove={handleOnClickRemove}
        />
      ))}
    </div>
  );
}

export default Main;
