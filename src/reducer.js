import {movies} from "./mocks/movies.js";
import {getGenres} from "./utils/genre.js";

const SHOW_MOVIES_COUNT = 8;

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SHOW_MOVIES: `SHOW_MOVIES`,
  RESET_COUNT_MOVIES: `RESET_COUNT_MOVIES`,
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const genres = getGenres(movies);

const initialState = {
  activeGenre: `all`,
  movies,
  showedMoviesCount: SHOW_MOVIES_COUNT,
  genres,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),
  showMovies: () => ({
    type: ActionType.SHOW_MOVIES,
    payload: null
  }),
  resetCountMovies: () => ({
    type: ActionType.RESET_COUNT_MOVIES,
    payload: null
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        activeGenre: action.payload,
      });
    case ActionType.SHOW_MOVIES:
      return extend(state, {
        showedMoviesCount: state.showedMoviesCount + SHOW_MOVIES_COUNT,
      });
    case ActionType.RESET_COUNT_MOVIES:
      return extend(state, {
        showedMoviesCount: SHOW_MOVIES_COUNT,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
