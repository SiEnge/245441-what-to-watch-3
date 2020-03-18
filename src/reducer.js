import {movies} from "./mocks/movies.js";
import {getGenres} from "./utils/genre.js";

const ActionType = {
  GET_FILTERED_MOVIES: `GET_FILTERED_MOVIES`,
  SET_GENRE: `SET_GENRE`,
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const genres = getGenres(movies);

const initialState = {
  activeGenre: `all`,
  movies: movies,
  genres: genres,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        activeGenre: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
