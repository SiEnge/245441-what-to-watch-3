import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {title, poster, onCardMouseOver} = props;

  return (<React.Fragment>
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={poster} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a
          onMouseOver={onCardMouseOver}
          className="small-movie-card__link"
          href="movie-page.html"
        >{title}</a>
      </h3>
    </article>
  </React.Fragment>);
};

SmallMovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  onCardMouseOver: PropTypes.func.isRequired,
};
