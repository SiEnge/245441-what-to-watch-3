import {extend} from "../../utils/common.js";
import {getGenres} from "../../utils/genre.js";
import {adapterMovies, adapterMovie} from "../../utils/movie.js";
const movies = []; //временно, чтобы не было ошибки
const genres = getGenres(movies);

const initialState = {
  activeGenre: `all`,
  page: 1,
  genres,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  INCREMENT_PAGE: `INCREMENT_PAGE`,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),
  incrementPage: () => ({
    type: ActionType.INCREMENT_PAGE,
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
