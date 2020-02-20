import React from "react";
import PropTypes from "prop-types";

const createDescriptionMarkup = (descriptions) => {
  return descriptions.map((description, i) => {
    return <p key={i}>{description}</p>;
  });
};

const ScoreName = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`,
};

const getScoreName = (score) => {
  let scoreName;

  if (score >= 0 && score < 3) {
    scoreName = ScoreName.BAD;
  } else if (score >= 3 && score < 5) {
    scoreName = ScoreName.NORMAL;
  } else if (score >= 5 && score < 8) {
    scoreName = ScoreName.GOOD;
  } else if (score >= 8 && score < 10) {
    scoreName = ScoreName.VERY_GOOD;
  } else if (score >= 10) {
    scoreName = ScoreName.AWESOME;
  }

  return scoreName;
};

const MovieCard = (props) => {
  const {promoMovie: {title, genre, date, poster, background, descriptions, score, rating, director, starring}} = props;

  const descriptionMarkup = createDescriptionMarkup(descriptions);
  const scoreName = getScoreName(score);

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={background} alt="{title}" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{date}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={poster} alt="{title} poster" width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item movie-nav__item--active">
                  <a href="#" className="movie-nav__link">Overview</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Details</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Reviews</a>
                </li>
              </ul>
            </nav>

            <div className="movie-rating">
              <div className="movie-rating__score">{score}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{scoreName}</span>
                <span className="movie-rating__count">{rating} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              {descriptionMarkup}

              <p className="movie-card__director"><strong>Director: {director}</strong></p>

              <p className="movie-card__starring"><strong>Starring: {starring}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MovieCard.propTypes = {
  promoMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string,
    date: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    descriptions: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    rating: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.string.isRequired,
  }),
};

export default MovieCard;
