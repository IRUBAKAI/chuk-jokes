import Icons, { Heart, Link } from "../Icons";
import styles from "./JokeList.module.css";
import React, { useState } from "react";

function JokeList({ jokes }) {


  const [favourites, setFavourites] = useState([])
  function handleAddToLocalStorage(joke) {
    const newFavouriteList = [...favourites, joke];
    const saveToLocalStorage = (joke) => {
      localStorage.setItem("joke-to-favourite", JSON.stringify(joke));
    };

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <>
    {jokes.map((joke)=> {
      return(
      <div key={joke.id} className={styles.joke_block}>
        <span className={styles.icon_mess}>{Icons}</span>
        <div className={styles.jokes_block}>
          <div className={styles.updateNCategory}>
            <span className={styles.id_joke}>
              ID:{" "}
              <a href={joke.url}>
                {joke.id}
                <span>{Link}</span>
              </a>
            </span>
            <span
              className={styles.icon_heart}
              onClick={()=> {
                handleAddToLocalStorage(joke)
              }}
            >
              {Heart}
            </span>
          </div>
          <p>{joke.value}</p>
          <div className={styles.updateNCategory}>
            <span className={styles.update_joke}>
              Last updated: {joke.updated_at}
            </span>
            <span className={styles.categories}>{joke.categories}</span>
          </div>
        </div>
      </div>
       )
      })}
    </>
  );
}

export default JokeList;
