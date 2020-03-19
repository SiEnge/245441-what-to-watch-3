import {movies} from "./mocks/movies.js";
import {getGenres} from "./utils/genre.js";

const PER_PAGE_MOVIE_COUNT = 8;

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  INCREMENT_PAGE: `INCREMENT_PAGE`,
  RESET_PAGE: `RESET_PAGE`,
  SHOW_MOVIES: `SHOW_MOVIES`,
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const genres = getGenres(movies);

const initialState = {
  activeGenre: `all`,
  movies,
  page: 1,
  showedMoviesCount: PER_PAGE_MOVIE_COUNT,
  genres,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),
  incrementPage: () => ({
    type: ActionType.INCREMENT_PAGE,
  }),
  resetPage: () => ({
    type: ActionType.RESET_PAGE,
  }),
  showMovies: () => ({
    type: ActionType.SHOW_MOVIES,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        activeGenre: action.payload,
      });
    case ActionType.INCREMENT_PAGE:
      return extend(state, {
        page: state.page + 1,
      });
    case ActionType.RESET_PAGE:
      return extend(state, {
        page: 1,
      });
    case ActionType.SHOW_MOVIES:
      return extend(state, {
        showedMoviesCount: state.page * PER_PAGE_MOVIE_COUNT,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
