import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import SignIn from "../sign-in/sign-in.jsx";
import history from "../../history.js";

it(`Render SignIn`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <SignIn
            onSubmit={() => {}}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
