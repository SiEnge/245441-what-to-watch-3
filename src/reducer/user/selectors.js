import NameSpace from "../name-space.js";

export const getAuthStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};
