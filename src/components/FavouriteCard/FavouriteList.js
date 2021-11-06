import React, { useEffect } from "react";
import styles from "./FavouriteList.module.css";
import Icons, { favouriteMenu, fillHeart, Link } from "../Main/Icons";

function FavouriteList({ favourites, setFavourites, handleOnClickRemove }) {
  useEffect(() => {
    const jokeFavourites = JSON.parse(
      localStorage.getItem("joke-to-favourite")
    ) || [];
    setFavourites(jokeFavourites);
  }, [setFavourites]);

  return (
    <>
      <span className={styles.favouriteMenu}>{favouriteMenu}</span>
      <div className={styles.favourite_block}>
        <h1>Favourite</h1>
        {favourites.map((favourite) => {
          return (
            <div key={favourite.id} className={styles.joke_block}>
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
                  <span
                    className={
                      favourite.categories === undefined
                        ? null
                        : favourite.categories.length === 1
                        ? styles.categories
                        : null
                    }
                  >
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
