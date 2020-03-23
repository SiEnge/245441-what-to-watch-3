import {getGenres} from "./utils/genre.js";
const movies = []; //временно, чтобы не было ошибки

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  INCREMENT_PAGE: `INCREMENT_PAGE`,
  LOAD_MOVIES: `LOAD_MOVIES`,
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const genres = getGenres(movies);

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        debugger;
        dispatch(ActionCreator.loadMovies(response.data));
      });
  },
};

const initialState = {
  activeGenre: `all`,
  movies: [],
  page: 1,
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
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
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
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
