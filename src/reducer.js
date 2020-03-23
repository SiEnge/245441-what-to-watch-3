import {getGenres} from "./utils/genre.js";
import {adapterMovies, adapterMovie} from "./utils/movie.js";
const movies = []; //временно, чтобы не было ошибки

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  INCREMENT_PAGE: `INCREMENT_PAGE`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const genres = getGenres(movies);

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
      });
  },
  loadPromoMovies: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovies(response.data));
      });
  },
};

const initialState = {
  activeGenre: `all`,
  movies: [],
  page: 1,
  genres,
  promoMovie: null,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),
  incrementPage: () => ({
    type: ActionType.INCREMENT_PAGE,
  }),
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: adapterMovies(movies),
  }),
  loadPromoMovies: (movie) => ({
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: adapterMovie(movie),
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        activeGenre: action.payload,
        page: 1
      });
    case ActionType.INCREMENT_PAGE:
      return extend(state, {
        page: state.page + 1,
      });
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
