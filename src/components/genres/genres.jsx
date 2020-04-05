import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {getGenres, getActiveGenre} from "../../reducer/data/selectors.js";
import {ActionCreator} from "../../reducer/state/state.js";
import PropTypes from "prop-types";
import {GENRE_ALL} from "../../const.js";

class Genres extends PureComponent {
  constructor(props) {
    super(props);

    this._handleGenreClick = this._handleGenreClick.bind(this);
  }

  _handleGenreClick(evt, genre) {
    const {onGenresClick} = this.props;

    onGenresClick(genre);
  }

  render() {
    const {genres, activeGenre} = this.props;

    return (
      <ul className="catalog__genres-list">

        <li className={`catalog__genres-item ${activeGenre === GENRE_ALL ? `catalog__genres-item--active` : ``}`}>
          <a
            onClick={
              (evt) => {
                evt.preventDefault();
                this._handleGenreClick(evt, GENRE_ALL);
              }
            }
            href="#" className="catalog__genres-link">All genres</a>
        </li>

        {genres.map((genre, i) =>
          <li key={i} className={`catalog__genres-item ${activeGenre === genre ? `catalog__genres-item--active` : ``}`}>
            <a
              onClick={
                (evt) => {
                  evt.preventDefault();
                  this._handleGenreClick(evt, genre);
                }
              }

              href="#" className="catalog__genres-link">{genre}</a>
          </li>
        )}
      </ul>
    );
  }
}

Genres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string),
  activeGenre: PropTypes.string.isRequired,
  onGenresClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genres: getGenres(state),
  activeGenre: getActiveGenre(state),
});

const mapDispatchToProps = ({onGenresClick: ActionCreator.setGenre});

export {Genres};
export default connect(mapStateToProps, mapDispatchToProps)(Genres);

