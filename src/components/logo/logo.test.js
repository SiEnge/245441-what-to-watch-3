import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Logo from "./logo.jsx";
import history from "../../history.js";
import {classLinkLogo} from "../../utils/test.utils.js";

it(`Render Logo`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Logo
            classLink={classLinkLogo}
          />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

