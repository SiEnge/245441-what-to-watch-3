import React from "react";
import renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button.jsx";
import {noop} from "../../const.js";

it(`Render ShowMoreButton`, () => {
  const tree = renderer
    .create(<ShowMoreButton
      onShowMoreButtonClick={noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

