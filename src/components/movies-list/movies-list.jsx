import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MoviesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSmallCard: -1
    };

    this.onCardHover = this.onCardHover.bind(this);
  }

  render() {
    const {movies, onTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) =>
          <SmallMovieCard
            key={movie.id}
            movie={movie}
            onTitleClick={onTitleClick}
            onCardHover={this.onCardHover}
          />
        )}
      </div>
    );
  }

  onCardHover(id) {
    if (id !== this.state.activeSmallCard) {
      this.setState({
        activeSmallCard: id,
      });
    }
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

  onTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
