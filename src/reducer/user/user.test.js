import {reducer, ActionType} from "./user.js";
import {AuthorizationStatus} from "../../const.js";
import {user} from "../../utils/test.utils.js";

it(`Reducer User without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    user: {},
  });
});

it(`Reducer User should update authorizationStatus and user by authorization`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    user: {},
  }, {
    type: ActionType.SET_AUTH_STATUS,
    payload: user,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    user,
  });
});

it(`Reducer User should update authorizationStatus and user by non-authorization`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    user: {},
  }, {
    type: ActionType.SET_NO_AUTH_STATUS,
    payload: {},
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    user: {},
  });
});


