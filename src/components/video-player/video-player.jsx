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
    const {preview, poster} = this.props;

    return (
      <video poster={poster} controls muted autoPlay>
        <source src={preview}/>
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  preview: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
