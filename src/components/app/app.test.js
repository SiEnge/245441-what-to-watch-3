import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import App from "../app/app.jsx";
import history from "../../history.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {movies, user, genres, activeGenre} from "../../utils/test.utils.js";
import {AuthorizationStatus} from "../../const.js";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
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

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <App
              authStatus={AuthorizationStatus.AUTH}
              authorization={() => {}}
              addComment={() => {}}
              getComment={() => {}}
              setActiveMovieId={() => {}}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
