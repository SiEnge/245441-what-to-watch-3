import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {movie} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={movie.poster} alt={movie.title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a

          className="small-movie-card__link"
          href="movie-page.html"
        >{movie.title}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }),
};

export default SmallMovieCard;
