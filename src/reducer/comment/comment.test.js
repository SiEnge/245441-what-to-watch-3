// import MockAdapter from "axios-mock-adapter";
// import {createAPI} from "../../api.js";
import {reducer, ActionType} from "./comment.js";
// import {reducer, ActionType, Operation} from "./comment.js";
import {comments} from "../../utils/test.utils.js";

// const api = createAPI(() => {});

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


// describe(`Operation comment work correctly`, () => {
//   it(`Should make a correct API call to get/comments/:id`, function () {
//     const apiMock = new MockAdapter(api);
//     const dispatch = jest.fn();
//     const commentsLoader = Operation.getComments();

//     apiMock
//       .onGet(`/comments/1`)
//       .reply(200, []);

//     return commentsLoader(dispatch, () => {}, api)
//       .then(() => {
//         expect(dispatch).toHaveBeenCalledTimes(1);
//         expect(dispatch).toHaveBeenNthCalledWith(1, {
//           type: ActionType.GET_COMMENTS,
//           payload: [],
//         });
//       });
//   });

//   it(`Should make a correct API call to post/comments/:id`, function () {
//     const apiMock = new MockAdapter(api);
//     const dispatch = jest.fn();
//     const commentsSet = Operation.addComment({
//       rating: 5,
//       comment: ``
//     });

//     // const login = Operation.addComment({
//     //   login: `test@123.com`,
//     //   password: `qweasd`
//     // });

//     apiMock
//       .onPost(`/comments/1`)
//       .reply(200, []);

//     return commentsSet(dispatch, () => {}, api)
//       .then(() => {
//         expect(dispatch).toHaveBeenCalledTimes(1);
//         expect(dispatch).toHaveBeenNthCalledWith(1, {
//           type: ActionType.GET_COMMENTS,
//           payload: [],
//         });
//       });
//   });
// });

// it(`Should make a correct API call to /comments/1`, function () {
//     const apiMock = new MockAdapter(api);
//     const dispatch = jest.fn();
//     const moviesLoader = Operation.getComments(1);

//     apiMock.onGet(`/comments/1`).reply(200, []);

//     return moviesLoader(dispatch, noop, api).then(() => {
//       expect(dispatch).toHaveBeenCalledTimes(1);
//       expect(dispatch).toHaveBeenNthCalledWith(1, {
//         type: ActionType.GET_COMMENTS,
//         payload: []
//       });
//     });
//   });

// it(`Should make a correct API call to /login`, function () {
//   const apiMock = new MockAdapter(api);
//   const dispatch = jest.fn();
//   const login = Operation.login({
//     login: `test@123.com`,
//     password: `qweasd`
//   });

//   apiMock.onPost(`/login`).reply(200, []);

//   return login(dispatch, noop, api)
//   .then(() => {
//     expect(dispatch).toHaveBeenCalledTimes(2);
//     expect(dispatch).toHaveBeenNthCalledWith(1, {
//       type: ActionType.REQUIRE_AUTHORIZATION,
//       payload: AuthorizationStatus.AUTH
//     });
//   });
// });

// const Operation = {
//   getComments: (movieId) => (dispatch, getState, api) => {
//     return api.get(`/comments/${movieId}`)
//       .then((response) => {
//         dispatch(ActionCreator.getComments(response.data));
//       });
//   },
//   addComment: (commentData) => (dispatch, getState, api) => {
//     return api.post(`/comments/${commentData.movieId}`, {
//       rating: +commentData.rating,
//       comment: commentData.comment,
//     })
//     .then((response) => {
//       dispatch(ActionCreator.getComments(response.data));
//       history.push(`${AppRoute.FILMS}/${commentData.movieId}`);
//     });
//   },
// };
