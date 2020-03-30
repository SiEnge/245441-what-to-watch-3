import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getActiveMovie} from "../../reducer/data/selectors.js";
import {AppRoute} from "../../const.js";
import {Link} from "react-router-dom";
import {withVideoPlayer} from "../../hocs/with-video-player/witn-video-player.jsx";

class Player extends PureComponent {
  constructor(props) {
    super(props);

    this._handleFullscreenButtonClick = this._handleFullscreenButtonClick.bind(this);
  }

  _handleFullscreenButtonClick() {
    const video = this._videoRef.current;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  render() {
    const {movie: {id, isPlaying}, onPlayButtonClick, children} = this.props;

    return (
      <div className="player">
        {children}

        <Link to={`${AppRoute.FILMS}/${id}`}
          type="button" className="player__exit">
          Exit
        </Link>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            {isPlaying ?
              <button
                onClick={() => onPlayButtonClick()}
                type="button" className="player__play">
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button> :
              <button
                onClick={() => onPlayButtonClick()}

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
}

Player.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    isPlaying: PropTypes.bool,
  }),

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,

  onPlayButtonClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
});

const PlayerWrap = withVideoPlayer(Player);

export {PlayerWrap};
export default connect(mapStateToProps)(PlayerWrap);
