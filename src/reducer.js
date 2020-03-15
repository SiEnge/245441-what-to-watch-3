const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const initialState = {
  genre: -1, // все фильмы
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: state.genre,
      });
  }

  return state;
};


export {reducer, ActionType};
