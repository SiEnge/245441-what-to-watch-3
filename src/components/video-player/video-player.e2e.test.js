import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";
import {movie} from "../../utils/test.utils.js";

const {poster, preview} = movie;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should change state isPlaying`, () => {
  jest.spyOn(window.HTMLMediaElement.prototype, `play`)
  .mockImplementation(() => {});

  const videoPlayer = mount(
      <VideoPlayer
        poster={poster}
        preview={preview}
      />
  );

  expect(videoPlayer.state(`isPlaying`)).toBe(false);
  videoPlayer.simulate(`canplaythrough`);
  expect(videoPlayer.state(`isPlaying`)).toBe(true);
});
