import React from "react";
import PropTypes from "prop-types";

const FavoriteButton = (props) => {
  const {movieId, isFavorite, onFavoriteButtonClick} = props;

  return (
    <button
      onClick={() => onFavoriteButtonClick({movieId, status: !isFavorite})}

      data-favorite={isFavorite}
      className="btn btn--list movie-card__button" type="button">
      {isFavorite ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg> :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      }
      <span>My list</span>
    </button>
  );
};

FavoriteButton.propTypes = {
  movieId: PropTypes.number,
  isFavorite: PropTypes.bool,

  onFavoriteButtonClick: PropTypes.func,
};

export default FavoriteButton;
