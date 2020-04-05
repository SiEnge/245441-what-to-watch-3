import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";
import {parseTime} from "../../utils/common.js";

export const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);
      this._videoRef = createRef();

      this.state = {
        isPlaying: false,
        duration: 0,
        currentTime: 0,
        progress: ``,
        elapsedTime: ``
      };

      this._handleCanPlayThrough = this._handleCanPlayThrough.bind(this);
      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
      this._handleFullscreenButtonClick = this._handleFullscreenButtonClick.bind(this);
      this._handleTimeUpdate = this._handleTimeUpdate.bind(this);
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
      const newState = !isPlaying;

      this.setState({
        isPlaying: newState,
      });
    }

    _handleCanPlayThrough(evt) {
      this._togglePlay();

      this.setState({
        duration: Math.floor(evt.target.duration),
      });
    }

    _handlePlayButtonClick() {
      this._togglePlay();
    }

    _handleFullscreenButtonClick() {
      const video = this._videoRef.current;

      if (!document.fullscreenElement) {
        video.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }

    _handleTimeUpdate(evt) {
      this.setState({
        currentTime: Math.floor(evt.target.currentTime),
        progress: String(
            (this.state.currentTime / this.state.duration) * 100
        ),
        elapsedTime: parseTime(this.state.duration - this.state.currentTime),
      });
    }

    render() {
      const {movie: {videoLink, previewVideo}, isMuted, isControls} = this.props;
      const {isPlaying, progress, elapsedTime} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onPlayButtonClick={this._handlePlayButtonClick}
          onFullscreenButtonClick={this._handleFullscreenButtonClick}

          progress={progress}
          elapsedTime={elapsedTime}
        >
          <video
            ref={this._videoRef}
            src={videoLink}
            onCanPlayThrough={this._handleCanPlayThrough}
            className="player__video"
            poster={previewVideo}
            muted={isMuted}
            onTimeUpdate={this._handleTimeUpdate}
            controls={isControls}
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

    isMuted: PropTypes.bool,
    isControls: PropTypes.bool,
  };

  return WithVideoPlayer;
};
