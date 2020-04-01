import React from "react";
import PropTypes from "prop-types";
import {withVideoPlayer} from "../../hocs/with-video-player/witn-video-player.jsx";

const SmallVideoPlayer = (props) => {
  const {children} = props;

  return (
    <div className="small-movie-card__image">
      {children}
    </div>
  );
};

SmallVideoPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default withVideoPlayer(SmallVideoPlayer);
