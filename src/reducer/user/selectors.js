import NameSpace from "../name-space.js";

export const getAuthStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getUser = (state) => {
  return state[NameSpace.USER].user;
};
