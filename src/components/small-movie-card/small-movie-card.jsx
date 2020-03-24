import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

const SmallMovieCard = (props) => {
  const {movie: {id, title, previewImage, poster, preview}, isPlaying, onMovieCardClick, onCardHover} = props;

  return (
    <article
      onMouseOver={() => onCardHover(id)}
      onMouseOut={() => onCardHover(-1)}
      className="small-movie-card catalog__movies-card"
    >
      <div onClick={() => onMovieCardClick(id)}
        className="small-movie-card__image">
        {isPlaying ? (
          <VideoPlayer poster={poster} preview={preview} />
        ) : (
          <img src={previewImage} alt={title} width="280" height="175" />
        )}
      </div>

      <h3 className="small-movie-card__title">
        <a onClick={(evt) => {
          evt.preventDefault();
          onMovieCardClick(id);
        }}
        className="small-movie-card__link"
        href="movie-page.html"
        >{title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    previewImage: PropTypes.string,
    preview: PropTypes.string,
    poster: PropTypes.string,
  }),

  isPlaying: PropTypes.bool.isRequired,

  onMovieCardClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
