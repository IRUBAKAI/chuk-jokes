import React from "react";
import styles from "../Main/Main.module.css";
import { useDispatch } from 'react-redux'

function CategorieBtns({ categorie }) {

  const dispatch = useDispatch()

  return (
    <>
      <div className={styles.btn_categories}>
        <div key={categorie}>
          <input
            className={categorie ? styles.categorie_btns_active : styles.categorie_btns}
            type="button"
            value={categorie}
            onClick={(event) => dispatch({ type: 'getCategorie', payload: categorie})}
          />
        </div>
      </div>
    </>
  );
}

export default CategorieBtns;
