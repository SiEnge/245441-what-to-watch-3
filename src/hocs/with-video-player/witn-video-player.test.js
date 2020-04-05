import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import {withVideoPlayer} from "./witn-video-player.jsx";
import {movie} from "../../utils/test.utils.js";
import {noop} from "../../const.js";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

const MockComponentWrapped = withVideoPlayer(MockComponent);

it(`withVideoPlayer is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      movie={movie}
      isPlaying={false}
      onPlayButtonClick={noop}
      onFullscreenButtonClick={noop}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
