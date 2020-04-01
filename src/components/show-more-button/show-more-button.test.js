import React from "react";
import renderer from "react-test-renderer";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
// import {comment} from "../../utils/test.utils.js";

it(`Render ShowMoreButton`, () => {
  const onShowMoreButtonClick = jest.fn();

  const tree = renderer
    .create(<ShowMoreButton
      onClick={onShowMoreButtonClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

