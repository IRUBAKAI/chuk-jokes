import React, { useState, useEffect } from "react";
import { JokeList } from "../JokeCard/index";
import { SearchList } from "../JokeCard/index";
import styles from "./Main.module.css";
import { Categories } from "../JokeCard/index";
import { FavouriteList } from "../FavouriteCard/index";
import CategorieBtns from "../CategorieBtns";

function Main() {
  const [jokes, setJokes] = useState([]);
  const [searchJokes, setSearchJokes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [status, setStatus] = useState(0);

  const [categorie, setCategorie] = useState("");
  const [search, setSearch] = useState("");

  const [checkedRandomInput, setCheckedRandomInput] = useState(false);
  const [checkedCategoriesInput, setCheckedCategoriesInput] = useState(false);
  const [checkedSearchInput, setCheckedSearchInput] = useState(false);

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

  useEffect(() => {
    handleRandomJokeAdd();
  }, []);

  function fetchCategories() {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((res) => res.json())
      .then((data) => setJokes(data));
  }

  const handleRandomJokeAdd = () => {
    if (checkedRandomInput.checked === true) {
      fetch("https://api.chucknorris.io/jokes/random")
        .then((res) => res.json())
        .then((data) => setJokes(data))
        .catch((err) => console.log(err));
      setStatus(1);
    }
    if (checkedCategoriesInput.checked === true) {
      fetch(`https://api.chucknorris.io/jokes/random?category=${categorie}`)
        .then((res) => res.json())
        .then((data) => setJokes(data))
        .catch((err) => console.log(err));
    }
    if (checkedSearchInput.checked === true) {
      fetch(`https://api.chucknorris.io/jokes/search?query=${search}`)
        .then((res) => res.json())
        .then((data) => setSearchJokes(data.result))
        .catch((err) => console.log(err));
    }
  };

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
                setCheckedRandomInput(event.target) &
                setStatus(0) &
                setSearch("")
              }
            />
            Random
          </label>

          <label>
            <input
              type="radio"
              name="name1"
              onChange={(event) =>
                fetchCategories() &
                setCheckedCategoriesInput(event.target) &
                setStatus(2) &
                setSearch("")
              }
            />
            From categories
          </label>

          <div
            className={
              status === 2 ? styles.categorie_btns_block : styles.unActive
            }
          >
            <CategorieBtns categorie={categorie} setCategorie={setCategorie} />
          </div>

          <label>
            <input
              type="radio"
              name="name1"
              onChange={(event) =>
                setCheckedSearchInput(event.target) & setStatus(3)
              }
            />
            Search
          </label>

          {status === 3 ? (
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Free text search..."
              onChange={(event) => setSearch(event.target.value)}
            />
          ) : null}

          <input
            type="button"
            className={styles.getJoke_btn}
            onClick={() => handleRandomJokeAdd()}
            value="Get a joke"
          />
        </form>

        <div className={status === 1 ? styles.active : styles.unActive}>
          <JokeList
            jokes={[jokes]}
            handleAddToLocalStorage={handleAddToLocalStorage}
            handleOnClickRemove={handleOnClickRemove}
            favourites={favourites}
          />
        </div>

        <div className={status === 2 ? styles.active : styles.unActive}>
          <Categories
            jokes={[jokes]}
            handleAddToLocalStorage={handleAddToLocalStorage}
            handleOnClickRemove={handleOnClickRemove}
            favourites={favourites}
          />
        </div>

        <div className={status === 3 ? styles.active : styles.unActive}>
          <SearchList
            jokes={searchJokes}
            handleAddToLocalStorage={handleAddToLocalStorage}
            handleOnClickRemove={handleOnClickRemove}
            favourites={favourites}
          />
        </div>
      </div>
      <FavouriteList
        favourites={favourites}
        setFavourites={setFavourites}
        handleOnClickRemove={handleOnClickRemove}
      />
    </div>
  );
}

export default Main;
