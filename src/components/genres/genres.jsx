import React from "react";
import PropTypes from "prop-types";


class Genres extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {genres} = this.props;

    return (
      <ul className="catalog__genres-list">
        <li className="catalog__genres-item catalog__genres-item--active">
          <a href="#" className="catalog__genres-link">All genres</a>
        </li>
        {genres.map((genre, i) =>
          <li key={i} className="catalog__genres-item">
            <a href="#" className="catalog__genres-link">{genre}</a>
          </li>
        )}
      </ul>
    );
  }
}

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
};

export default Genres;
