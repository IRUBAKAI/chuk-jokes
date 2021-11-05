import Icons, { fillHeart, Heart, Link } from "../Icons";
import styles from "./JokeList.module.css";

function CategorieList({
  jokes,
  handleAddToLocalStorage,
  handleOnClickRemove,
  favourites,
}) {
  return (
    <>
      {jokes.map((joke) => {
        const isFavourite = Boolean(
          favourites.find((favouriteFilm) => favouriteFilm.id === joke.id)
        );
        return (
          <div key={joke} className={styles.joke_block}>
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
                  onClick={
                    !isFavourite
                      ? () => handleAddToLocalStorage(joke)
                      : () => handleOnClickRemove(joke)
                  }
                >
                  {!isFavourite ? Heart : fillHeart}
                </span>{" "}
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
        );
      })}
    </>
  );
}

export default CategorieList;
