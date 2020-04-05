import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {AuthorizationStatus} from "../../const.js";
import {reducer, ActionType, ActionCreator, Operation} from "./user.js";
import {user, serverUser} from "../../utils/test.utils.js";
import {noop} from "../../const.js";

const api = createAPI(noop);

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

describe(`Operation User work correctly`, () => {
  it(`Should make a correct API call to /login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authorization = Operation.authorization({
      email: `a@a.ru`,
      password: `123456`,
    });

    apiMock.onPost(`/login`).reply(200, serverUser);

    return authorization(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTH_STATUS,
          payload: user
        });
      });
  });
});

describe(`Action User creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.auth(serverUser))
      .toEqual({
        type: ActionType.SET_AUTH_STATUS,
        payload: user
      });

    expect(ActionCreator.noAuth())
      .toEqual({
        type: ActionType.SET_NO_AUTH_STATUS,
      });
  });
});
