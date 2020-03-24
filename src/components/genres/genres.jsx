import React from "react";
import {connect} from "react-redux";
import {getGenres} from "../../reducer/data/selectors.js";
import {ActionCreator} from "../../reducer/state/state.js";
import PropTypes from "prop-types";

class Genres extends React.Component {
  constructor(props) {
    super(props);

    this._handleGenreClick = this._handleGenreClick.bind(this);
  }

  _handleGenreClick(evt) {
    const {onGenresClick} = this.props;

    evt.preventDefault();
    const genre = evt.currentTarget;

    onGenresClick(genre.dataset.genre);
  }

  render() {
    const {genres} = this.props;

    return (
      <ul className="catalog__genres-list">
        <li className="catalog__genres-item catalog__genres-item--active">
          <a onClick={this._handleGenreClick} data-genre="all"
            href="#" className="catalog__genres-link">All genres</a>
        </li>
        {genres.map((genre, i) =>
          <li key={i} className="catalog__genres-item">
            <a onClick={this._handleGenreClick} data-genre={genre}
              href="#" className="catalog__genres-link">{genre}</a>
          </li>
        )}
      </ul>
    );
  }
}

Genres.propTypes = {
  genres: PropTypes.array,
  onGenresClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  genres: getGenres(state),
});

const mapDispatchToProps = ({onGenresClick: ActionCreator.setGenre});

export {Genres};
export default connect(mapStateToProps, mapDispatchToProps)(Genres);
