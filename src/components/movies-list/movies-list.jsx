import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import {withActiveSmallCard} from "../../hocs/with-active-small-card/with-active-small-card.jsx";

const MoviesList = (props) => {
  const {movies, onMovieCardClick, activeSmallCard, onSmallCardHover} = props;

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) =>
        <SmallMovieCard
          key={movie.id}
          movie={movie}
          isPlaying={movie.id === activeSmallCard}
          onMovieCardClick={onMovieCardClick}
          onCardHover={onSmallCardHover}
        />
      )}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array,
  activeSmallCard: PropTypes.number,

  onMovieCardClick: PropTypes.func.isRequired,
  onSmallCardHover: PropTypes.func.isRequired,
};

export default withActiveSmallCard(MoviesList);
