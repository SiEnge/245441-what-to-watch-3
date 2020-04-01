import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import MyList from "../my-list/my-list.jsx";
import history from "../../history.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {movies, user} from "../../utils/test.utils.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    movies,
  },
  [NameSpace.USER]: {
    user,
  }
});

it(`Render MyList`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <MyList
              movies={movies}
              onMovieCardClick={() => {}}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
