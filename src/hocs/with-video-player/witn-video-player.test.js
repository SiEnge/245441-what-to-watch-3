import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import {withVideoPlayer} from "../../hocs/with-video-player/witn-video-player.jsx";
import {movie} from "../../utils/test.utils.js";

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
      onPlayButtonClick={() => {}}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
