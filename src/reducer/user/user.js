import {extend} from "../../utils/common.js";

const URL = `https://htmlacademy-react-3.appspot.com/`;

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  avatarUrl: ``,
};

const ActionType = {
  UPDATE_AUTH_STATUS: `UPDATE_AUTH_STATUS`,
  SET_AVATAR_URL: `SET_AVATAR_URL`,
};

const ActionCreator = {
  updateAuthStatus: (authStatus) => ({
    type: ActionType.UPDATE_AUTH_STATUS,
    payload: authStatus,
  }),
  setAvatarUrl: (avatarUrl) => ({
    type: ActionType.SET_AVATAR_URL,
    payload: avatarUrl,
  }),
};

const Operation = {
  getAuthStatus: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.updateAuthStatus(response.data));
        dispatch(ActionCreator.setAvatarUrl(response.data.avatar_url));
      });
  },
  authorization: (authData) => (dispatch, getState, api) => {
    return api
      .post(`/login`, {
        email: authData.login,
        password: authData.password,
      })
      .then((response) => {
        dispatch(ActionCreator.updateAuthStatus(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setAvatarUrl(response.data.avatar_url));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_AUTH_STATUS:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SET_AVATAR_URL:
      return extend(state, {
        avatarUrl: `${URL}${action.payload}`,
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator, AuthorizationStatus};
