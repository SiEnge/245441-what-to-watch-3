import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {GENRE_ALL} from "../../const.js";

export const getPromoMovie = (state) => {
  return state[NameSpace.DATA].promoMovie;
};

export const getActiveMovieId = (state) => {
  return state[NameSpace.DATA].activeMovieId;
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
      return (activeGenre === GENRE_ALL) ? movies : movies.filter((movie) => movie.genre === activeGenre);
    }
);

export const getFavoriteMovies = createSelector(
    getMovies,
    (movies) => {
      return movies.filter((movie) => movie.isFavorite);
    }
);

export const getActiveMovie = createSelector(
    getMovies,
    getActiveMovieId,
    (movies, activeMovieId) => {
      return (activeMovieId === -1) ? movies[0] : movies.filter((movie) => movie.id === activeMovieId)[0];
    }
);

export const getSimilarMovies = createSelector(
    getMovies,
    getActiveMovie,
    (movies, activeMovie) => {
      return movies.filter((movie) => movie.id !== activeMovie.id && movie.genre === activeMovie.genre);
    }
);
