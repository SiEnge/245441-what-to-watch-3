import {extend} from "../../utils/common.js";
import {adapterUser} from "../../utils/user.js";
import {AuthorizationStatus} from "../../const.js";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {},
};

const ActionType = {
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
  SET_NO_AUTH_STATUS: `SET_NO_AUTH_STATUS`,
};

const ActionCreator = {
  auth: (user) => ({
    type: ActionType.SET_AUTH_STATUS,
    payload: adapterUser(user),
  }),
  noAuth: () => ({
    type: ActionType.SET_NO_AUTH_STATUS,
  }),
};

const Operation = {
  getAuthStatus: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.auth(response.data));
      })
      .catch((error) => {
        throw error;
      });
  },
  authorization: (authData, onSuccess, onError) => (dispatch, getState, api) => {
    return api
      .post(`/login`, {
        email: authData.login,
        password: authData.password,
      })
      .then((response) => {
        dispatch(ActionCreator.auth(response.data));
        onSuccess();
      })
      .catch((error) => {
        if (error.response) {
          onError(error.response.data.error);
        }
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH_STATUS:
      return extend(state, {
        authorizationStatus: AuthorizationStatus.AUTH,
        user: action.payload,
      });
    case ActionType.SET_NO_AUTH_STATUS:
      return extend(state, {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {},
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator, AuthorizationStatus};
