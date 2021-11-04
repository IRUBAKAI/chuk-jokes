import React, { useState, useEffect } from "react";
import JokeList from "./JokeList";
import styles from "./Main.module.css";

function Main() {
  const [randomJoke, setRandomJoke] = useState([]);
  const [checkedRandomInput, setCheckedRandomInput] = useState(false);
  const [checkedSearchInput, setCheckedSearchInput] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    handleRandomJokeAdd();
  }, []);

  const handleRandomJokeAdd = () => {
    if (checkedRandomInput === true) {
      fetch("https://api.chucknorris.io/jokes/random")
        .then((res) => res.json())
        .then((data) => setRandomJoke(data));
      setStatus(1);
    } else return console.log(false);
  };

  console.log(checkedRandomInput)
  return (
    <div className={styles.content}>
      <h3>MSI 2021</h3>
      <div className={styles.title}>
        <h1>Hey!</h1>
        <h2>Let’s try to find a joke for you:</h2>
      </div>
      <div className={styles.checkbox_block}>
        <label>
          <input
            type="radio"
            name="name1"
            onChange={(event) => setCheckedRandomInput(event.target.checked)}
          />
          Random
        </label>

        <label>
          <input type="radio" name="name1"/>
          From Categories
        </label>

        <label>
          <input type="radio" name="name1" onChange={(event)=> setCheckedSearchInput(event.target.checked)}/>
          Search
        </label>

        {(!checkedSearchInput === false ? (<input type="text"/>) : null)}
      </div>
      <button
        className={styles.getJoke_btn}
        onClick={() => (!checkedRandomInput === false ? handleRandomJokeAdd() : null)}
      >
        Get a joke
      </button>
      <div className={status === 1 ? styles.active : styles.jokeList}>
        <JokeList randomJoke={randomJoke} />
      </div>
    </div>
  );
}

export default Main;
