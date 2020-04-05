import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Main from "./main.jsx";
import history from "../../history.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {movies, user, activeGenre, genres} from "../../utils/test.utils.js";
import {AuthorizationStatus, noop} from "../../const.js";


const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    page: 1,
    movies,
    promoMovie: movies[0],
    genres,
  },
  [NameSpace.STATE]: {
    activeGenre,
  },
  [NameSpace.USER]: {
    authStatus: AuthorizationStatus.AUTH,
    user
  },
});

it(`Render Main with authorization`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <Main
              page={1}
              authStatus={AuthorizationStatus.AUTH}

              onMovieCardClick={noop}
              onShowMoreButtonClick={noop}
              setStatusFavoriteMovie={noop}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
