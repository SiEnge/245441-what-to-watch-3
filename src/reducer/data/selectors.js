import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

export const getPromoMovie = (state) => {
  return state[NameSpace.DATA].promoMovie;
};

export const getMovies = (state) => {
  return state[NameSpace.DATA].movies;
};

export const getGenres = (state) => {
  return state[NameSpace.DATA].genres;
};

export const getActiveGenre = (state) => {
  return state[NameSpace.STATE].activeGenre;
};

export const getMoviesByGenre = createSelector(
    getMovies,
    getActiveGenre,
    (movies, activeGenre) => {
      return (activeGenre === `all`) ? movies : movies.filter((movie) => movie.genre === activeGenre);
    }
);
