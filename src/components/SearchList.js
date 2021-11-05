import React from "react";
import styles from "./JokeCard/JokeList.module.css";
import Icons, { Heart, Link } from "./Icons";

function SearchList({ jokes }) {
  const result = jokes.map((joke) => joke.result);

  return (
    <>
      {result.map((joke) => {
        return (
          <div>
            {joke.map((item) => {
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
                      <span className={styles.icon_heart}>{Heart}</span>
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
