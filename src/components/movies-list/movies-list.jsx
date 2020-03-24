import React from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

const VIDEO_DELAY = 1000;

class MoviesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSmallCard: -1,
    };

    this.onCardHover = this.onCardHover.bind(this);
  }

  render() {
    const {movies, onMovieCardClick} = this.props;
    const {activeSmallCard} = this.state;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) =>
          <SmallMovieCard
            key={movie.id}
            movie={movie}
            isPlaying={movie.id === activeSmallCard}
            onMovieCardClick={onMovieCardClick}
            onCardHover={this.onCardHover}
          />
        )}
      </div>
    );
  }

  onCardHover(id) {
    if (id !== this.state.activeSmallCard) {
      if (id === -1) {
        this.setState({
          activeSmallCard: id,
        });
      } else {
        setTimeout(() => {
          this.setState({
            activeSmallCard: id,
          });
        }, VIDEO_DELAY);
      }
    }
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        poster: PropTypes.string,
      })
  ).isRequired,

  onMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
