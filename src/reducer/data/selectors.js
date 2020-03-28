import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

export const getPromoMovie = (state) => {
  return state[NameSpace.DATA].promoMovie;
};

export const getActiveMovieId = (state) => {
  return state[NameSpace.DATA].activeMovieId;
};

export const getMovies = (state) => {
  return state[NameSpace.DATA].movies;
};

export const getFavoriteMovies = (state) => {
  return state[NameSpace.DATA].favoriteMovies;
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

export const getActiveMovie = createSelector(
    getMovies,
    getActiveMovieId,
    (movies, activeMovieId) => {
      return (activeMovieId === -1) ? movies[0] : movies.filter((movie) => movie.id === activeMovieId)[0];
    }
);
