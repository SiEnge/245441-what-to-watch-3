import {extend} from "../../utils/common.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionType = {
  UPDATE_AUTH_STATUS: `UPDATE_AUTH_STATUS`,
};

const ActionCreator = {
  updateAuthStatus: (authStatus) => ({
    type: ActionType.UPDATE_AUTH_STATUS,
    payload: authStatus,
  }),
};

const Operation = {
  updateAuthStatus: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.updateAuthStatus(response.data));
      });
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_AUTH_STATUS:
      return extend(state, {
        authorizationStatus: action.payload,
      });
  }
  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
