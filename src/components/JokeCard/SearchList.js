import React from "react";
import styles from "./JokeList.module.css";
import Icons, { fillHeart, Heart, Link } from "../Icons";

function SearchList({
  jokes,
  handleAddToLocalStorage,
  handleOnClickRemove,
  favourites,
}) {
  const result = jokes.map((joke) => joke.result);
  return (
    <>
      {result.map((joke) => {
        return (
          <div>
            {joke.map((item) => {
              const isFavourite = Boolean(
                favourites.find((favouriteFilm) => favouriteFilm.id === item.id)
              );
              return (
                <div className={styles.joke_block}>
                  <span className={styles.icon_mess}>{Icons}</span>
                  <div className={styles.jokes_block}>
                    <div className={styles.updateNCategory}>
                      <span className={styles.id_joke}>
                        ID:{" "}
                        <a href={item.url}>
                          {item.id}
                          <span>{Link}</span>
                        </a>
                      </span>
                      <span
                        className={styles.icon_heart}
                        onClick={
                          !isFavourite
                            ? () => handleAddToLocalStorage(joke)
                            : () => handleOnClickRemove(joke)
                        }
                      >
                        {!isFavourite ? Heart : fillHeart}
                      </span>
                    </div>
                    <p>{item.value}</p>
                    <div className={styles.updateNCategory}>
                      <span className={styles.update_joke}>
                        Last updated: {item.updated_at}
                      </span>
                      <span className={styles.categories}>
                        {item.categories}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default SearchList;
