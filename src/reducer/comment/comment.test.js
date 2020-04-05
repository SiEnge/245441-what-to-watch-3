import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, ActionCreator, Operation} from "./comment.js";
import {comments} from "../../utils/test.utils.js";
import {noop} from "../../const.js";

const api = createAPI(noop);

it(`Reducer Comment without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    comments: [],
  });
});

it(`Reducer Comment should update comments by load comments`, () => {
  expect(reducer({
    comments: [],
  }, {
    type: ActionType.GET_COMMENTS,
    payload: comments,
  })).toEqual({
    comments,
  });
});

describe(`Operation Comment work correctly`, () => {
  it(`Should make a correct API call to get/comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getComments = Operation.getComments(1);

    apiMock.onGet(`/comments/1`).reply(200, [{fake: true}]);

    return getComments(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to post/comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onSuccess = jest.fn();
    const onError = jest.fn();

    const addComment = Operation.addComment({
      movieId: 1,
      rating: `5`,
      comment: `comment`,
    }, onSuccess, onError);

    apiMock.onPost(`/comments/1`).reply(200, {fake: true});

    return addComment(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_COMMENTS,
          payload: {fake: true},
        });
      });
  });
});

describe(`Action Comment creators work correctly`, () => {
  it(`Action creator returns correct action`, () => {
    expect(ActionCreator.getComments([{fake: true}]))
      .toEqual({
        type: ActionType.GET_COMMENTS,
        payload: [{fake: true}]
      });
  });
});
