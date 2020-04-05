import {extend} from "../../utils/common.js";
import {adapterMovies, adapterMovie} from "../../utils/movie.js";
import {getGenres} from "../../utils/genre.js";

const initialState = {
  movies: [],
  promoMovie: {},
  activeMovieId: -1,
  genres: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  UPDATE_MOVIES: `UPDATE_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  SET_ACTIVE_MOVIE_ID: `SET_ACTIVE_MOVIE_ID`,
  GET_GENRES: `GET_GENRES`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: adapterMovies(movies),
  }),
  updateMovies: (movie) => ({
    type: ActionType.UPDATE_MOVIES,
    payload: adapterMovie(movie),
  }),
  loadPromoMovies: (movie) => ({
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: adapterMovie(movie),
  }),
  setActiveMovieId: (movieId) => ({
    type: ActionType.SET_ACTIVE_MOVIE_ID,
    payload: movieId,
  }),
  getGenres: (movies) => ({
    type: ActionType.GET_GENRES,
    payload: getGenres(adapterMovies(movies)),
  }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
        dispatch(ActionCreator.getGenres(response.data));
      });
  },
  loadPromoMovies: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovies(response.data));
      });
  },
  setStatusFavoriteMovie: (statusData) => (dispatch, getState, api) => {
    return api.post(`/favorite/${statusData.movieId}/${statusData.isFavorite ? `1` : `0`}`)
      .then((response) => {
        if (statusData.isPromo) {
          dispatch(ActionCreator.loadPromoMovies(response.data));
        } else {
          dispatch(ActionCreator.updateMovies(response.data));
        }
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.UPDATE_MOVIES:
      const movies = state.movies;
      const newMovie = action.payload;
      const index = movies.findIndex((movie) => newMovie.id === movie.id);
      const result = [].concat(movies.slice(0, index), newMovie, movies.slice(index + 1));
      return extend(state, {
        movies: result,
      });
    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });
    case ActionType.SET_ACTIVE_MOVIE_ID:
      return extend(state, {
        activeMovieId: action.payload,
      });
    case ActionType.GET_GENRES:
      return extend(state, {
        genres: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
