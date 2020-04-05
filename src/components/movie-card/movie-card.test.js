import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import MovieCard from "./movie-card.jsx";
import history from "../../history.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {movie, movies, comments, user} from "../../utils/test.utils.js";
import {AuthorizationStatus, noop} from "../../const.js";

const mockStore = configureStore([]);

it(`Render MovieCard with authorization`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      activeMovieId: 1,
      movies,
      movie,
    },
    [NameSpace.COMMENT]: {
      comments,
    },
    [NameSpace.USER]: {
      authStatus: AuthorizationStatus.AUTH,
      user
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <MovieCard
              movie={movie}
              movies={movies}
              onMovieCardClick={noop}
              comments={comments}
              authStatus={AuthorizationStatus.AUTH}
              setStatusFavoriteMovie={noop}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render MovieCard without authorization`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      activeMovieId: 1,
      movies,
      movie,
    },
    [NameSpace.COMMENT]: {
      comments,
    },
    [NameSpace.USER]: {
      authStatus: AuthorizationStatus.NO_AUTH,
      user
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <MovieCard
              movie={movie}
              movies={movies}
              onMovieCardClick={noop}
              comments={comments}
              authStatus={AuthorizationStatus.NO_AUTH}
              setStatusFavoriteMovie={noop}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
