import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

const VIDEO_DELAY = 1000;

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeSmallCard: -1,
    };

    this._handleCardHover = this._handleCardHover.bind(this);
  }

  _handleCardHover(id) {
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
            onCardHover={this._handleCardHover}
          />
        )}
      </div>
    );
  }

}

MoviesList.propTypes = {
  movies: PropTypes.array,

  onMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
