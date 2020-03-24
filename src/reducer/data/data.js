import {extend} from "../../utils/common.js";
import {adapterMovies, adapterMovie} from "../../utils/movie.js";
import {getGenres} from "../../utils/genre.js";

const initialState = {
  movies: [],
  promoMovie: {},
  genres: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  SET_GENRES: `SET_GENRES`,
};

const ActionCreator = {
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: adapterMovies(movies),
  }),
  loadPromoMovies: (movie) => ({
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: adapterMovie(movie),
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
  loadPromoMovies: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoMovies(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });
    case ActionType.SET_GENRES:
      return extend(state, {
        genres: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
