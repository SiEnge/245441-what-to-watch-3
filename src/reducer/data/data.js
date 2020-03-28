import {extend} from "../../utils/common.js";
import {adapterMovies, adapterMovie} from "../../utils/movie.js";
import {getGenres} from "../../utils/genre.js";

const initialState = {
  movies: [],
  favoriteMovies: [],
  promoMovie: {},
  activeMovieId: -1,
  genres: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  SET_ACTIVE_MOVIE_ID: `SET_ACTIVE_MOVIE_ID`,
  SET_GENRES: `SET_GENRES`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: adapterMovies(movies),
  }),
  loadFavoriteMovies: (favortiveMovies) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: adapterMovies(favortiveMovies),
  }),
  loadPromoMovies: (movie) => ({
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: adapterMovie(movie),
  }),
  setActiveMovieId: (movieId) => ({
    type: ActionType.SET_ACTIVE_MOVIE_ID,
    payload: movieId,
  }),
  setGenres: (movies) => ({
    type: ActionType.SET_GENRES,
    payload: getGenres(adapterMovies(movies)),
  }),
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
        dispatch(ActionCreator.setGenres(response.data));
      });
  },
  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteMovies(response.data));
      });
  },
  loadPromoMovies: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovies(response.data));
      });
  },
  setStatusFavoriteMovie: (statusData) => (dispatch, getState, api) => {
    return api.post(`/favorite/${statusData.movieId}/${statusData.status}`)
      .then((response) => {
        debugger;
        // dispatch(ActionCreator.loadFavoriteMovies(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload,
      });
    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });
    case ActionType.SET_ACTIVE_MOVIE_ID:
      return extend(state, {
        activeMovieId: action.payload,
      });
    case ActionType.SET_GENRES:
      return extend(state, {
        genres: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
