const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const initialState = {
  activeGenre: `all`, // все фильмы
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        activeGenre: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
