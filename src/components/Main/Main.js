import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";
import stylesJokeCard from "../JokeCard/JokeCard.module.css";
import stylesFavourite from "../JokeCard/FavouriteList.module.css";
import { JokeCard } from "../JokeCard/";
import { Pagination } from "../Pagination";
import { favouriteMenu } from "./Icons";
import Form from "./Form";
import {
  fetchCategories,
  handleAddToLocalStorage,
  handleOnClickRemove,
} from "./helpers";

function Main() {
  /// Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [jokesPerPage] = useState(5);

  //// Jokes States

  const [jokes, setJokes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [statusBurgerMenu, setStatusBurgerMenu] = useState("unActive");
  const [categories, setCategories] = useState([]);

  // useEffects

  useEffect(() => {
    const jokeFavourites =
      JSON.parse(localStorage.getItem("joke-to-favourite")) || [];
    setFavourites(jokeFavourites);

    fetchCategories(setCategories);
  }, []);

  //BURGER MENU CHANGE

  function burgerMenuChangeStatus() {
    if (statusBurgerMenu === "unActive") {
      setStatusBurgerMenu("active");
    } else setStatusBurgerMenu("unActive");
  }

  /// Get current Jokes

  const indexOfLastJoke = currentPage * jokesPerPage;
  const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;
  const currentJokes = jokes.slice(indexOfFirstJoke, indexOfLastJoke);
  const howManyPages = Math.ceil(jokes.length / jokesPerPage);

  return (
    <div className={styles.main_sec}>
      <div className={styles.content}>
        <h3>MSI 2021</h3>
        <div className={styles.title}>
          <h1>Hey!</h1>
          <h2>Let’s try to find a joke for you:</h2>
        </div>

        {/* FORM */}

        <Form
          categories={categories}
          currentJokes={currentJokes}
          setJokes={setJokes}
          setCurrentPage={setCurrentPage}
        />

        {/* RENDER JOKES */}

        <div>
          {currentJokes.map((joke) => {
            const isFavourite = Boolean(
              favourites.find((favouriteJoke) => favouriteJoke.id === joke.id)
            );
            function storageButtonsAddNRemove() {
              if (!isFavourite) {
                handleAddToLocalStorage(joke, favourites, setFavourites);
              } else handleOnClickRemove(joke, favourites, setFavourites);
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

        {/* ///PAGINATION */}

        {currentJokes.length < 2 ? null : (
          <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
        )}
      </div>

      {/* FAVOUrITES JOkECARD */}

      <div className={stylesFavourite.favourite_block}>
        <h1>Favourite</h1>
        {favourites.map((favourite) => {
          function storageButtonRemove() {
            handleOnClickRemove(favourite, favourites, setFavourites);
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

      {/* ///BURGER MENU FAVOURITES */}

      <span
        className={styles.icon_favourite_menu}
        onClick={() => burgerMenuChangeStatus()}
      >
        {favouriteMenu}
        <h1>Favourite</h1>
      </span>
      <div
        className={
          statusBurgerMenu === "active" ? styles.main_sec_bg_active : null
        }
      ></div>
      <div
        className={
          statusBurgerMenu === "active"
            ? stylesFavourite.media_favourite_block_active
            : stylesFavourite.media_favourite_block
        }
      >
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
