import React from "react";
import PropTypes from "prop-types";
import {withVideoPlayer} from "../../hocs/with-video-player/witn-video-player.jsx";

const SmallVideoPlayer = (props) => {
  const {onMovieCardClick, children} = props;

  return (
    <div className="small-movie-card__image" onClick={onMovieCardClick}>
      {children}
    </div>
  );
};

SmallVideoPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,

  onMovieCardClick: PropTypes.func,
};

export default withVideoPlayer(SmallVideoPlayer);
