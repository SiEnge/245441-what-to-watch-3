import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import {connect} from "react-redux";
import {getActiveMovie} from "../../reducer/data/selectors.js";
import {AppRoute} from "../../const.js";
import {Link} from "react-router-dom";

// const Player = (props) => {
class Player extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: false,
    };

    this._handleCanPlayThrough = this._handleCanPlayThrough.bind(this);
    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    this._handlePauseButtonClick = this._handlePauseButtonClick.bind(this);
    this._handleFullscreenButtonClick = this._handleFullscreenButtonClick.bind(this);
  }

  _handleCanPlayThrough() {
    this.setState({
      isPlaying: true,
    })
  }

  _handlePlayButtonClick() {
    this.setState({
      isPlaying: true,
    })
  }

  _handlePauseButtonClick() {
    this.setState({
      isPlaying: false,
    })
  }

  _handleFullscreenButtonClick() {
    const video = this._videoRef.current;

    if (!document.fullscreenElement) {
      video.requestFullscreen()
        .catch(err => {
          console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
      document.exitFullscreen();
    }
  }

  // вызывается при обновлении компонента
  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  render() {
    const {movie: {id, title, previewVideo, poster, videoLink}} = this.props;
    const {isPlaying} = this.state;

    return (
      <div className="player">
        <video
          ref={this._videoRef}
          src={videoLink}
          onCanPlayThrough={this._handleCanPlayThrough}
          className="player__video"
          poster={previewVideo}
        ></video>

        <Link to={`${AppRoute.FILMS}/${id}`}
          type="button" className="player__exit">
          Exit
        </Link>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={{left: "30%"}}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            {isPlaying ?
              <button
                onClick={this._handlePauseButtonClick}
                type="button" className="player__play">
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button> :
              <button
                onClick={this._handlePlayButtonClick}
                type="button" className="player__play">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
            }


            <div className="player__name">Transpotting</div>

            <button
              onClick={this._handleFullscreenButtonClick}
              type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }


};

Player.propTypes = {
};


const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
});

export {Player};
export default connect(mapStateToProps)(Player);
