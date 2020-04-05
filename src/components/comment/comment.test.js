import React from "react";
import renderer from "react-test-renderer";
import Comment from "./comment.jsx";
import {comment} from "../../utils/test.utils.js";

it(`Render Comment`, () => {
  const tree = renderer
    .create(<Comment
      comment={comment}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

