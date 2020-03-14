const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const GenreType = {
  ALL_GENRES: `All genres`,
  COMEDIAS: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMAS: `Dramas`,
  HORROR: `Horror`,
  KIDS_FAMILY: `Kids & Family`,
  ROMANCE: `Kids & Family`,
  SCI_FI: `Sci-Fi`,
  THRILLERS: `Thrillers`,
};

const initialState = {
  genre: GenreType.ALL_GENRES,
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



