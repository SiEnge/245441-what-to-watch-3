import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getActiveMovie} from "../../reducer/data/selectors.js";
import {withVideoPlayer} from "../../hocs/with-video-player/witn-video-player.jsx";

const Player = (props) => {
  const {isPlaying, onPlayButtonClick, onFullscreenButtonClick, onExitButtonClick, children,
    elapsedTime, progress} = props;

  return (
    <div className="player">
      {children}

      <button
        onClick={onExitButtonClick}
        type="button" className="player__exit">
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{elapsedTime}</div>
        </div>

        <div className="player__controls-row">
          {isPlaying ?
            <button
              onClick={onPlayButtonClick}
              type="button" className="player__play">
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"></use>
              </svg>
              <span>Pause</span>
            </button> :
            <button
              onClick={onPlayButtonClick}
              type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
          }

          <div className="player__name">Transpotting</div>

          <button
            onClick={onFullscreenButtonClick}
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
};

Player.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
  }),

  isPlaying: PropTypes.bool,

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,

  elapsedTime: PropTypes.string.isRequired,
  progress: PropTypes.string.isRequired,

  onPlayButtonClick: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  onFullscreenButtonClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
});

const PlayerWrapped = withVideoPlayer(Player);
export {PlayerWrapped};
export default connect(mapStateToProps)(PlayerWrapped);

