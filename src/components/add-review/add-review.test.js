import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import AddReview from "./add-review.jsx";
import history from "../../history.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {movie, movies, user} from "../../utils/test.utils.js";
import {AuthorizationStatus, noop} from "../../const.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    activeMovieId: 1,
    movies,
    movie,
  },
  [NameSpace.USER]: {
    authStatus: AuthorizationStatus.AUTH,
    user
  },
});

it(`Render AddReview with disabled form`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <AddReview
              movie={movie}
              isDisabledForm={true}
              onSubmit={noop}
              onBackButtonClick={noop}
              onDisabledForm={noop}
              onError={noop}
              onHistoryBack={noop}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it(`Render AddReview without disabled form`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <AddReview
              movie={movie}
              isDisabledForm={false}
              onSubmit={noop}
              onBackButtonClick={noop}
              onDisabledForm={noop}
              onError={noop}
              onHistoryBack={noop}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
