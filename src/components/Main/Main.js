import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";
import stylesJokeCard from "../JokeCard/JokeCard.module.css";
import stylesFavourite from "../JokeCard/FavouriteList.module.css";
import { CategorieBtn } from "../JokeCard/";
import { JokeCard } from "../JokeCard/";
import { Pagination } from "../Pagination";
import { favouriteMenu } from "./Icons";

function Main() {
  /// Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [jokesPerPage] = useState(5);

  //// Jokes States

  const [jokes, setJokes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [status, setStatus] = useState(0);
  const [statusBurgerMenu, setStatusBurgerMenu] = useState(0);

  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState("");
  const [search, setSearch] = useState("");
  const [errorSearch, setErrorSearch] = useState("");

  const [checkedRandomInput, setCheckedRandomInput] = useState(false);
  const [checkedCategoriesInput, setCheckedCategoriesInput] = useState(false);
  const [checkedSearchInput, setCheckedSearchInput] = useState(false);

  /// LOCALSTORAGE Buttons

  function handleAddToLocalStorage(joke) {
    const newFavouriteList = [...favourites, joke];
    const saveToLocalStorage = (joke) => {
      localStorage.setItem("joke-to-favourite", JSON.stringify(joke));
    };

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  function handleOnClickRemove(joke) {
    const newFavouriteList = favourites.filter((favourite) => {
      return favourite.id !== joke.id;
    });
    const saveToLocalStorage = (joke) => {
      localStorage.setItem("joke-to-favourite", JSON.stringify(joke));
    };
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  // useEffects

  useEffect(() => {
    handleRandomJokeAdd();
  }, []);

  useEffect(() => {
    const jokeFavourites =
      JSON.parse(localStorage.getItem("joke-to-favourite")) || [];
    setFavourites(jokeFavourites);
  }, [setFavourites]);

  /// FETCH REQUEST

  function fetchCategories() {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }

  const handleRandomJokeAdd = (event) => {
    if (checkedRandomInput.checked === true) {
      fetch("https://api.chucknorris.io/jokes/random")
        .then((res) => res.json())
        .then((data) => setJokes([data]))
        .catch((err) => console.log(err));
      setCurrentPage(1);
      setStatus(1);
    }
    if (checkedCategoriesInput.checked === true) {
      fetch(`https://api.chucknorris.io/jokes/random?category=${categorie}`)
        .then((res) => res.json())
        .then((data) => setJokes([data]))
        .catch((err) => console.log(err));
      setStatus(3);
      setCurrentPage(1);
    }
    if (checkedSearchInput.checked === true) {
      if (search.length >= 3) {
        fetch(`https://api.chucknorris.io/jokes/search?query=${search}`)
          .then((res) => res.json())
          .then((data) => setJokes(data.result))
          .catch((err) => console.log(err));
        setErrorSearch(null);
      } else setErrorSearch("You need 3 letters for search");
    }
  };

  function burgerMenuChangeStatus() {
    if (statusBurgerMenu === 1) {
      setStatusBurgerMenu(0);
    } else setStatusBurgerMenu(1);
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

        <form
          className={styles.checkbox_block}
        >
          <label>
            <input
              type="radio"
              name="name1"
              onChange={(event) => {
                setCheckedRandomInput(event.target);
                setStatus(0);
                setSearch("");
              }}
            />
            Random
          </label>

          <label>
            <input
              type="radio"
              name="name1"
              onChange={(event) => {
                fetchCategories();
                setCheckedCategoriesInput(event.target);
                setStatus(2);
                setSearch("");
              }}
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
              <CategorieBtn
                categorie={categorie}
                setCategorie={setCategorie}
                categories={categories}
              />
            ))}
          </div>

          <label>
            <input
              type="radio"
              name="name1"
              onChange={(event) => {
                setCheckedSearchInput(event.target);
                setStatus(4);
              }}
            />
            Search
          </label>

          {status === 4 ? (
            <>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Free text search..."
                onKeyDown={(e) => e.key === "Enter" && handleRandomJokeAdd()}
                onChange={(event) => setSearch(event.target.value)}
              />
              <p className={styles.errorSearch}>{errorSearch}</p>
              <h1
                className={
                  currentJokes.length === 0 ? styles.active : styles.unActive
                }
              >
                Nothing is here &#129488;
              </h1>
            </>
          ) : null}

          <input
            type="submit"
            className={styles.getJoke_btn}
            onClick={(event) => {
              handleRandomJokeAdd(event);
              event.preventDefault()
            }}
            value="Get a joke"
          />
        </form>

        {/* RENDER JOKES */}

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

      {/* ///BURGER MENU FAVOURITES */}

      <span
        className={styles.icon_favourite_menu}
        onClick={() => burgerMenuChangeStatus()}
      >
        {favouriteMenu}
        <h1>Favourite</h1>
      </span>
      <div
        className={statusBurgerMenu === 1 ? styles.main_sec_bg_active : null}
      ></div>
      <div
        className={
          statusBurgerMenu === 1
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
