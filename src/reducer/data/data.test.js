import {reducer, ActionType} from "./data.js";
import {movies, movie, genres} from "../../utils/test.utils.js";


it(`Reducer Data without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    movies: [],
    favoriteMovies: [],
    promoMovie: {},
    activeMovieId: -1,
    genres: [],
  });
});


it(`Reducer Data should update movies by load movies`, () => {
  expect(reducer({
    movies: [],
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  })).toEqual({
    movies,
  });
});

it(`Reducer Data should update favorite movies by load favorite movies`, () => {
  expect(reducer({
    favoriteMovies: [],
  }, {
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: movies,
  })).toEqual({
    favoriteMovies: movies,
  });
});

it(`Reducer Data should update promo movie by load promo movie`, () => {
  expect(reducer({
    promoMovie: [],
  }, {
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: movie,
  })).toEqual({
    promoMovie: movie,
  });
});

it(`Reducer Data should update genres by load genres`, () => {
  expect(reducer({
    genres: [],
  }, {
    type: ActionType.GET_GENRES,
    payload: genres,
  })).toEqual({
    genres,
  });
});

it(`Reducer Data should set active movie id by load active movie id`, () => {
  expect(reducer({
    activeMovieId: -1,
  }, {
    type: ActionType.SET_ACTIVE_MOVIE_ID,
    payload: 1,
  })).toEqual({
    activeMovieId: 1,
  });

  expect(reducer({
    activeMovieId: 10,
  }, {
    type: ActionType.SET_ACTIVE_MOVIE_ID,
    payload: 1,
  })).toEqual({
    activeMovieId: 1,
  });
});
