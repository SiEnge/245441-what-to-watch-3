import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import UserBlock from "./user-block.jsx";
import history from "../../history.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {user} from "../../utils/test.utils.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.USER]: {
    user,
  }
});

it(`Render UserBlock with authorization`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <UserBlock
              isAuth={true}
              user={user}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render UserBlock without authorization`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <UserBlock
              isAuth={false}
              user={user}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
