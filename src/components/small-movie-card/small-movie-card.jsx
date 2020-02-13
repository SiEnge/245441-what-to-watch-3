import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {id, movie} = props;

  return (<React.Fragment>
    <article key={id} className="small-movie-card catalog__movies-card">
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
  </React.Fragment>);
};

SmallMovieCard.propTypes = {
  id: PropTypes.string.isRequired,

  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }),

  onCardMouseOver: PropTypes.func.isRequired,
};

export default SmallMovieCard;

// onMouseOver={onCardMouseOver}
