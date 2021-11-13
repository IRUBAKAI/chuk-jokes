import React from 'react'
import JokeCard from './JokeCard';
import stylesFavourite from './FavouriteList.module.css'


export default function FavouriteList({favourites, handleOnClickRemove}) {

    return (
        <div>
        {favourites.map((favourite) => {
          function storageButtonRemove() {
            handleOnClickRemove(favourite);
          }
          return (
            <JokeCard
              joke={favourite}
              styles={stylesFavourite}
              storageButtons={storageButtonRemove}
            />
          );
        })}
        </div>
    )
}
