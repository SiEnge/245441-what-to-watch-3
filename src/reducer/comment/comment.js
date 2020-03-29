import {extend} from "../../utils/common.js";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

const initialState = {
  comments: [],
};

const ActionType = {
  GET_COMMENTS: `GET_COMMENTS`,
};

const ActionCreator = {
  getComments: (comments) => ({
    type: ActionType.GET_COMMENTS,
    payload: comments,
  }),
};

const Operation = {
  getComments: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        dispatch(ActionCreator.getComments(response.data));
      });
  },
  addComment: (commentData) => (dispatch, getState, api) => {
    debugger;
    return api.post(`/comments/${commentData.movieId}`, {
        rating: +commentData.rating,
        comment: commentData.comment,
      })
      .then((response) => {
        dispatch(ActionCreator.getComments(response.data));
        history.push(`${AppRoute.FILMS}/${commentData.movieId}`)
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
