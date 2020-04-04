import {extend} from "../../utils/common.js";

const initialState = {
  activeGenre: `all`,
  page: 1,
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
    payload: 1,
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
        page: state.page + action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
