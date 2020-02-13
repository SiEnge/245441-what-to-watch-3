import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {movie, onTitleClick, onCardHover} = props;
  debugger;
  return (
    <article
      onMouseOver={() => onCardHover(movie.id)}
      onMouseOut={() => onCardHover(-1)}
      className="small-movie-card catalog__movies-card"
    >
      <div className="small-movie-card__image">
        <img src={movie.poster} alt={movie.title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a
          onClick={onTitleClick}
          className="small-movie-card__link"
          href="movie-page.html"
        >{movie.title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.exact({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,

  onTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
