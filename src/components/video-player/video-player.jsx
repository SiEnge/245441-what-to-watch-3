import React from "react";
import PropTypes from "prop-types";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false
    };
  }

  render() {
    const {preview, poster} = this.props.movie;

    return (
      <video
        controls
        muted
        scr={preview}
        poster={poster}
        autoPlay
      >
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  movie: PropTypes.shape({
    preview: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoPlayer;
