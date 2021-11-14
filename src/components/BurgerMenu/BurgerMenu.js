import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { favouriteMenu, closeMenu } from "../Main/Icons";
import JokeCard from "../JokeCard/JokeCard";

export default function BurgerMenu({
  styles,
  stylesFavourite,
  favourite,
  handleOnClickRemove,
}) {
  const statusBurgerMenu = useSelector((state) => state.favouriteReducer.statusBurgerMenu);

  const dispatch = useDispatch()

  function burgerMenuChangeStatus() {
    if (statusBurgerMenu === "unActive") {
        dispatch({ type: 'setStatusBurgerMenu', payload: "active"});
    } else dispatch({ type: 'setStatusBurgerMenu', payload: "unActive"});;
  }
  function storageButtonRemove() {
    handleOnClickRemove(favourite);
  }
  return (
    <div>
      <span
        className={styles.icon_favourite_menu}
        onClick={() => burgerMenuChangeStatus()}
      >
        {statusBurgerMenu === 'active' ? closeMenu : favouriteMenu}
        <h1>Favourite</h1>
      </span>
      <div
        className={
          statusBurgerMenu === "active" ? styles.main_sec_bg_active : null
        }
      ></div>
      <div
        className={
          statusBurgerMenu === "active"
            ? stylesFavourite.media_favourite_block_active
            : stylesFavourite.media_favourite_block
        }
      >
        <JokeCard
          joke={favourite}
          styles={stylesFavourite}
          storageButtons={storageButtonRemove}
        />
      </div>
    </div>
  );
}
