import NameSpace from "../name-space.js";

export const getComments = (state) => {
  return state[NameSpace.COMMENT].comments;
};
