import React, { useState } from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ jokesPerPage, totalJokes, paginate }) {
  const pageNumbers = [];
  const [target, setStarget] = useState("");

  for (let i = 1; i <= Math.ceil(totalJokes / jokesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className={styles.ul_page_number}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.page_number}>
            <a
              id={number}
              className={
                number == target
                  ? styles.page_number_link_active
                  : styles.page_number_link
              }
              onClick={(event) =>
                paginate(number) & setStarget(event.target.id)
              }
              href="!#"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
