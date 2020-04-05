import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import history from "../../history.js";
import PrivateRoute from "./private-route.jsx";
import configureStore from "redux-mock-store";
import {AuthorizationStatus} from "../../const.js";
import {Router} from "react-router-dom";
import {AppRoute, noop} from "../../const.js";
import NameSpace from "../../reducer/name-space.js";
import {user} from "../../utils/test.utils.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    user,
  }
});

it(`Render PrivateRoute with authorization`, () => {
  const tree = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <PrivateRoute
            exact
            path={AppRoute.ROOT}
            render={noop}
          />
        </Router>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
