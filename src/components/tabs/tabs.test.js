import React from "react";
import renderer from "react-test-renderer";
import Tabs from "../tabs/tabs.jsx";
import {movie} from "../../utils/test.utils.js";

it(`Render Tabs`, () => {
  const tree = renderer
    .create(<Tabs
      movie={movie}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
