import React from 'react'
import JokeCard from './JokeCard';
import stylesFavourite from './FavouriteList.module.css'


export default function FavouriteList({favourite, handleOnClickRemove}) {
  function storageButtonRemove() {
    handleOnClickRemove(favourite);
  }
    return (
        <div>
            <JokeCard
              joke={favourite}
              styles={stylesFavourite}
              storageButtons={storageButtonRemove}
            />
        </div>
    )
}
