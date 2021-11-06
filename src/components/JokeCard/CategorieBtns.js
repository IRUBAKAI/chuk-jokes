import React, { useState } from "react";
import styles from "../Main/Main.module.css";

function CategorieBtns({ categories, setCategorie }) {
  const [target, setStarget] = useState("");

  return (
    <>
      <div className={styles.btn_categories}>
        {categories.map((categorie) => {
          return (
            <div key={categorie}>
              <button
                className={
                  categorie === target
                    ? styles.categorie_btns_active
                    : styles.categorie_btns
                }
                type="button"
                value={categorie}
                onClick={(event) =>
                  setCategorie(categorie) & setStarget(event.target.value)
                }
              >
                {categorie}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CategorieBtns;
