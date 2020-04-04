import {reducer, ActionType} from "./state.js";
import {activeGenre} from "../../utils/test.utils.js";

it(`Reducer State without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeGenre: `all`,
    page: 1,
  });
});

it(`Reducer State should update activeGenre`, () => {
  expect(reducer({
    activeGenre: `all`,
    page: 1,
  }, {
    type: ActionType.SET_GENRE,
    payload: activeGenre,
  })).toEqual({
    activeGenre,
    page: 1,
  });
});

it(`Reducer State should increment number of page by a given value`, () => {
  expect(reducer({
    page: 1,
  }, {
    type: ActionType.INCREMENT_PAGE,
    payload: 1,
  })).toEqual({
    page: 2,
  });
});
