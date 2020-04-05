import React from "react";
import renderer from "react-test-renderer";
import SmallVideoPlayer from "./small-video-player.jsx";
import {movie} from "../../utils/test.utils.js";
import {noop} from "../../const.js";

it(`Render SmallVideoPlayer`, () => {
  const tree = renderer
    .create(
        <SmallVideoPlayer
          movie={movie}
          onMovieCardClick={noop}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
