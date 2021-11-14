import React from "react";
import styles from "../Main/Main.module.css";
import { CategorieBtn } from "../JokeCard";
import { useSelector, useDispatch } from "react-redux";

export default function Form({
  categories,
  currentJokes,
  handleRandomJokeAdd,
}) {
  const checkedRadio = useSelector((state) => state.checkedReducer.checkedRadio);
  const errorSearch = useSelector((state) => state.errorReducer.errorSearch);

  const dispatch = useDispatch();

  return (
    <div>
      <form className={styles.checkbox_block}>
        <label>
          <input
            type="radio"
            name="name1"
            onChange={() =>
              dispatch({ type: "setCheckedRadio", payload: "random" })
            }
          />
          Random
        </label>

        <label>
          <input
            type="radio"
            name="name1"
            onChange={() =>
              dispatch({ type: "setCheckedRadio", payload: "categorie" })
            }
          />
          From categories
        </label>

        <div
          className={
            checkedRadio === "categorie"
              ? styles.categorie_btns_block
              : styles.unActive
          }
        >
          {categories.map((categorie) => (
            <CategorieBtn categorie={categorie} categories={categories} />
          ))}
        </div>

        <label>
          <input
            type="radio"
            name="name1"
            onChange={() =>
              dispatch({ type: "setCheckedRadio", payload: "search" })
            }
          />
          Search
        </label>

        {checkedRadio === "search" ? (
          <>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Free text search..."
              onChange={(event) =>
                dispatch({ type: "setSearch", payload: event.target.value })
              }
            />
            <p className={styles.errorSearch}>{errorSearch}</p>
            <h1
              className={
                currentJokes.length === 0 ? styles.active : styles.unActive
              }
            >
              Nothing is here &#129488;
            </h1>
          </>
        ) : null}

        <input
          type="submit"
          className={styles.getJoke_btn}
          onClick={(event) => {
            event.preventDefault();
            handleRandomJokeAdd();
          }}
          value="Get a joke"
        />
      </form>
    </div>
  );
}
