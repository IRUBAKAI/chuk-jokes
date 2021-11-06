import React, { useState } from "react";
import styles from "../Main/Main.module.css";

function CategorieBtns({ categorie, setCategorie }) {

  const [target, setTarget] = useState('')

  return (
    <>
      <div className={styles.btn_categories}>
        <div key={categorie}>
          <input
            className={categorie === target ? styles.categorie_btns_active : styles.categorie_btns}
            type="button"
            value={categorie}
            onClick={(event) => setCategorie(categorie) & setTarget(event.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default CategorieBtns;
