import React, { useState, useEffect } from "react";
import styles from "./Main.module.css";
import { FavouriteList } from "../FavouriteCard/index";
import { CategorieBtns } from "../JokeCard/index";
import { JokeCard } from "../JokeCard/index";
import Pagination from "./Pagination";

function Main() {
  /// Pagination states

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);  
  const [jokesPerPage] = useState(5);  

  const [jokes, setJokes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [status, setStatus] = useState(0);

  const [categories, setCategories] = useState([])
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
      .then((data) => setCategories(data));
  }

  const handleRandomJokeAdd = () => {
    if (checkedRandomInput.checked === true) {
      fetch("https://api.chucknorris.io/jokes/random")
        .then((res) => res.json())
        .then((data) => setJokes([data]))
        .catch((err) => console.log(err));
      setStatus(1);
    }
    if (checkedCategoriesInput.checked === true) {
      fetch(`https://api.chucknorris.io/jokes/random?category=${categorie}`)
        .then((res) => res.json())
        .then((data) => setJokes([data]))
        .catch((err) => console.log(err));
      setStatus(3);
    }
    if (checkedSearchInput.checked === true) {
      setLoading(true)
      fetch(`https://api.chucknorris.io/jokes/search?query=${search}`)
        .then((res) => res.json())
        .then((data) => setJokes(data.result))
        .catch((err) => console.log(err));
      setLoading(false)
    }
  };

  /// Get current Jokes

  const indexOfLastJoke = currentPage * jokesPerPage;
  const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;
  const currentJokes = jokes.slice(indexOfFirstJoke, indexOfLastJoke)


  /// Change number

  const paginate = (jokeNumber) => setCurrentPage(jokeNumber)

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
            className={status === 3 ? styles.categorie_btns_block :
              status === 2 ? styles.categorie_btns_block : styles.unActive
            }
          >
            {categories.map((categorie) => <CategorieBtns categorie={categorie} setCategorie={setCategorie}/>)}
          </div>

          <label>
            <input
              type="radio"
              name="name1"
              onChange={(event) =>
                setCheckedSearchInput(event.target) & setStatus(4)
              }
            />
            Search
          </label>

          {status === 4 ? (
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

        <JokeCard
          jokes={currentJokes}
          handleAddToLocalStorage={handleAddToLocalStorage}
          handleOnClickRemove={handleOnClickRemove}
          favourites={favourites}
          loading={loading}
        />

      {currentJokes.length < 2 ? null : 
        <Pagination jokesPerPage={jokesPerPage} totalJokes={jokes.length} paginate={paginate}/>
      }
      
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
