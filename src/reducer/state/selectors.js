import NameSpace from "../name-space.js";

export const getPage = (state) => {
  return state[NameSpace.STATE].page;
};
