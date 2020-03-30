import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";

export const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);
      this._videoRef = createRef();

      this.state = {
        isPlaying: false,
      };

      this._handleCanPlayThrough = this._handleCanPlayThrough.bind(this);
      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.src = ``;
    }

    _togglePlay() {
      const {isPlaying} = this.state;

      this.setState({
        isPlaying: !isPlaying,
      });
    }

    _handleCanPlayThrough() {
      this._togglePlay();
    }

    _handlePlayButtonClick() {
      this._togglePlay();
    }

    render() {
      const {movie: {videoLink, previewVideo}} = this.props;
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onPlayButtonClick={this._handlePlayButtonClick}
        >
          <video
            ref={this._videoRef}
            src={videoLink}
            onCanPlayThrough={this._handleCanPlayThrough}
            className="player__video"
            poster={previewVideo}
          />

        </Component>
      );
    }
  }

  WithVideoPlayer.propTypes = {
    movie: PropTypes.shape({
      videoLink: PropTypes.string,
      previewVideo: PropTypes.string,
    }),
  };

  return WithVideoPlayer;
};
