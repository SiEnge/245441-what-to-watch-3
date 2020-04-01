import React from "react";
import renderer from "react-test-renderer";
import SmallVideoPlayer from "../small-video-player/small-video-player.jsx";
import {movie} from "../../utils/test.utils.js";

it(`Render SmallVideoPlayer`, () => {
  const tree = renderer
    .create(
        <SmallVideoPlayer
          movie={movie}
          onPlayButtonClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
