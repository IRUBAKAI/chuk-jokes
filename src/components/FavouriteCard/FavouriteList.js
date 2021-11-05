import React, { useEffect } from "react";
import styles from "./FavouriteList.module.css";
import Icons, { favouriteMenu, fillHeart, Link } from "../Icons";

function FavouriteList({ favourites, setFavourites, handleOnClickRemove }) {


  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("joke-to-favourite")
    );
    setFavourites(movieFavourites);
  }, [setFavourites]);

  return (
    <>
    <span className={styles.favouriteMenu}>{favouriteMenu}</span>
      <div className={styles.favourite_block}>
        <h1>Favourite</h1>
        {favourites.map((favourite) => {
          return (
            <div className={styles.joke_block}>
              <span className={styles.icon_mess}>{Icons}</span>
              <div className={styles.jokes_block}>
                <div className={styles.updateNCategory}>
                  <span className={styles.id_joke}>
                    ID:{" "}
                    <a href={favourite.url}>
                      {favourite.id}
                      <span>{Link}</span>
                    </a>
                  </span>
                  <span
                    className={styles.icon_heart}
                    onClick={() => handleOnClickRemove(favourite)}
                  >
                    {fillHeart}
                  </span>
                </div>
                <p>{favourite.value}</p>
                <div className={styles.updateNCategory}>
                  <span className={styles.update_joke}>
                    Last updated: {favourite.updated_at}
                  </span>
                  <span className={styles.categories}>
                    {favourite.categories}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FavouriteList;
