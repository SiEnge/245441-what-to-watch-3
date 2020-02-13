import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../smart-movie-card/smart-movie-card.jsx";

class MoviesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSmallCard: -1
    };
  }

  render() {
    const {movies} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) =>
          <SmallMovieCard
            key={movie.id}
            movie={movie}
          />
        )}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      })
  ).isRequired,
};

export default MoviesList;
