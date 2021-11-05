import React from 'react';
import styles from "./Main/Main.module.css";


function CategorieBtns({ categorie, setCategorie }) {

    return(
        <>
            <button
            type="button"
            className={categorie === 'animal' ? styles.categorie_btns_active : styles.categorie_btns}
            value='animal'
            onClick={(e) => setCategorie(e.target.value)}
          >
            animal
          </button>
          <button
            type="button"
            className={categorie === 'career' ? styles.categorie_btns_active : styles.categorie_btns}
            value='career'
            onClick={(e) => setCategorie(e.target.value)}
          >
            career
          </button>
          <button
            type="button"
            className={categorie === 'celebrity' ? styles.categorie_btns_active : styles.categorie_btns}
            value='celebrity'
            onClick={(e) => setCategorie(e.target.value)}
          >
            celebrity
          </button>
          <button
            type="button"
            className={categorie === 'dev' ? styles.categorie_btns_active : styles.categorie_btns}
            value='dev'
            onClick={(e) => setCategorie(e.target.value)}
          >
            dev
          </button>

          <button
            type="button"
            className={categorie === 'explicit' ? styles.categorie_btns_active : styles.categorie_btns}
            value='explicit'
            onClick={(e) => setCategorie(e.target.value)}
          >
            explicit
          </button>

          <button
            type="button"
            className={categorie === 'fashion' ? styles.categorie_btns_active : styles.categorie_btns}
            value='fashion'
            onClick={(e) => setCategorie(e.target.value)}
          >
            fashion
          </button>

          <button
            type="button"
            className={categorie === 'food' ? styles.categorie_btns_active : styles.categorie_btns}
            value='food'
            onClick={(e) => setCategorie(e.target.value)}
          >
            food
          </button>

          <button
            type="button"
            className={categorie === 'history' ? styles.categorie_btns_active : styles.categorie_btns}
            value='history'
            onClick={(e) => setCategorie(e.target.value)}
          >
            history
          </button>

          <button
            type="button"
            className={categorie === 'money' ? styles.categorie_btns_active : styles.categorie_btns}
            value='money'
            onClick={(e) => setCategorie(e.target.value)}
          >
            money
          </button>

          <button
            type="button"
            className={categorie === 'movie' ? styles.categorie_btns_active : styles.categorie_btns}
            value='movie'
            onClick={(e) => setCategorie(e.target.value)}
          >
            movie
          </button>

          <button
            type="button"
            className={categorie === 'music' ? styles.categorie_btns_active : styles.categorie_btns}
            value='music'
            onClick={(e) => setCategorie(e.target.value)}
          >
            music
          </button>

          <button
            type="button"
            className={categorie === 'political' ? styles.categorie_btns_active : styles.categorie_btns}
            value='political'
            onClick={(e) => setCategorie(e.target.value)}
          >
            political
          </button>

          <button
            type="button"
            className={categorie === 'religion' ? styles.categorie_btns_active : styles.categorie_btns}
            value='religion'
            onClick={(e) => setCategorie(e.target.value)}
          >
            religion
          </button>

          <button
            type="button"
            className={categorie === 'science' ? styles.categorie_btns_active : styles.categorie_btns}
            value='science'
            onClick={(e) => setCategorie(e.target.value)}
          >
            science
          </button>

          <button
            type="button"
            className={categorie === 'sport' ? styles.categorie_btns_active : styles.categorie_btns}
            value='sport'
            onClick={(e) => setCategorie(e.target.value)}
          >
            sport
          </button>

          <button
            type="button"
            className={categorie === 'travel' ? styles.categorie_btns_active : styles.categorie_btns}
            value='travel'
            onClick={(e) => setCategorie(e.target.value)}
          >
            travel
          </button>
        </>
    )
}

export default CategorieBtns