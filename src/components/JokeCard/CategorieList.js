import Icons, { Heart, Link } from "../Icons";
import styles from "./JokeList.module.css";

function CategorieList({ jokes }) {
  return (
    <>
      <div key={jokes.id} className={styles.joke_block}>
        <span className={styles.icon_mess}>{Icons}</span>
        <div className={styles.jokes_block}>
          <div className={styles.updateNCategory}>
            <span className={styles.id_joke}>
              ID:{" "}
              <a href={jokes.url}>
                {jokes.id}
                <span>{Link}</span>
              </a>
            </span>
            <span className={styles.icon_heart}>{Heart}</span>
          </div>
          <p>{jokes.value}</p>
          <div className={styles.updateNCategory}>
            <span className={styles.update_joke}>
              Last updated: {jokes.updated_at}
            </span>
            <span className={styles.categories}>{jokes.categories}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategorieList;
