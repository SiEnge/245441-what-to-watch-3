import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "../video-player/video-player.jsx";
import {movie} from "../../utils/test.utils.js";

const {poster, preview} = movie;

it(`Render VideoPlayer`, () => {
  const tree = renderer
    .create(<VideoPlayer
      poster={poster}
      preview={preview}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
