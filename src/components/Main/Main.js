import React, { useState, useEffect } from "react";
import { JokeList } from "../JokeCard/index";
import SearchList from "../SearchList";
import styles from "./Main.module.css";
import { Categories } from "../JokeCard/index";
import { FavouriteList } from "../FavouriteCard/index";
import CategorieBtns from "../CategorieBtns";

function Main() {
  const [jokes, setJokes] = useState([]);
  const [searchJoke, setSearchJoke] = useState([]);
  const [checkedRandomInput, setCheckedRandomInput] = useState(false);

  const [checkedCategoriesInput, setCheckedCategoriesInput] = useState(false);
  const [categorie, setCategorie] = useState("");

  const [search, setSearch] = useState("");
  const [checkedSearchInput, setCheckedSearchInput] = useState(false);
  const [status, setStatus] = useState(0);

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
        .then((data) => setJokes(data));
      setStatus(1);
    }
    if (checkedCategoriesInput.checked === true) {
      fetch(`https://api.chucknorris.io/jokes/random?category=${categorie}`)
        .then((res) => res.json())
        .then((data) => setJokes(data));
        setJokes([])
    }
    if (checkedSearchInput.checked === true) {
      fetch(`https://api.chucknorris.io/jokes/search?query=${search}`)
        .then((res) => res.json())
        .then((data) => setSearchJoke([data]));
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
        </form>

        <button
          className={styles.getJoke_btn}
          onClick={() => handleRandomJokeAdd()}
        >
          Get a joke
        </button>

        {console.log(status)}
        <div className={status === 2 ? styles.active : styles.unActive}>
          <Categories jokes={jokes} />
        </div>

        <div className={status === 3 ? styles.active : styles.unActive}>
          <SearchList jokes={searchJoke} />
        </div> 

        <div className={status === 1 ? styles.active : styles.unActive}>
          <JokeList jokes={[jokes]} />
        </div>
      </div>
      <FavouriteList />
    </div>
  );
}

export default Main;
