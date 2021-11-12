import React from "react";
import styles from "../Main/Main.module.css";
import { useDispatch } from "react-redux"

function CategorieBtn({categorie}) {
  const dispatch = useDispatch()
  return (
    <>
      <div className={styles.btn_categories}>
        <label key={categorie}>
          <input
            className={styles.unActive}
            type="radio"
            name="name2"
            value={categorie}
            onClick={() => dispatch({type: 'getCategorie', payload: categorie})}
          />
          <span className={styles.active_categorie_btn}>{categorie}</span>
        </label>
      </div>
    </>
  );
}

export default CategorieBtn;
