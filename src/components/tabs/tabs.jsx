import React from "react";
import PropTypes from "prop-types";
import {withActiveTab} from "../../hocs/witn-active-tab/witn-active-tab.jsx";

const MINUTE_IN_ONE_HOUR = 60;
const TEN_MINUTES = 10;

const TabsType = {
  OVERVIEW: `Overview`,
  DETAIL: `Details`,
  REVIEWS: `Reviews`
};

const ScoreType = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`,
};

const getScoreType = (score) => {
  let scoreName;

  if (score >= 0 && score < 3) {
    scoreName = ScoreType.BAD;
  } else if (score >= 3 && score < 5) {
    scoreName = ScoreType.NORMAL;
  } else if (score >= 5 && score < 8) {
    scoreName = ScoreType.GOOD;
  } else if (score >= 8 && score < 10) {
    scoreName = ScoreType.VERY_GOOD;
  } else if (score >= 10) {
    scoreName = ScoreType.AWESOME;
  }

  return scoreName;
};



const parseDuration = (duration) => {
  if (duration > MINUTE_IN_ONE_HOUR) {
    const hour = Math.floor(duration / MINUTE_IN_ONE_HOUR);
    const minute = (duration % MINUTE_IN_ONE_HOUR < TEN_MINUTES) ? `0${duration % MINUTE_IN_ONE_HOUR}` : duration % MINUTE_IN_ONE_HOUR;
    return `${hour}h ${minute}m`;
  }

  return `${duration}m`;
};

const Tabs = (props) => {
  // debugger;
  const {movie: {genre, date, descriptions, score, rating, runtime, director, starring}, activeTab, comments} = props;

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {Object.values(TabsType).map((tab, i) =>
            <li key={i} className={tab === activeTab ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`}>
              <a href="#" className="movie-nav__link" onClick={props.onClickTab} data-name={tab}>{tab}</a>
            </li>
          )}
        </ul>
      </nav>

      {activeTab === TabsType.OVERVIEW &&
        <div className="movie-rating">
          <div className="movie-rating__score">{score}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{getScoreType(score)}</span>
            <span className="movie-rating__count">{rating} ratings</span>
          </p>
        </div>
      }

      {activeTab === TabsType.OVERVIEW &&
        <div className="movie-card__text">
          {descriptions.map((description, i) =>
            <p key={i}>{description}</p>
          )}
          <p className="movie-card__director"><strong>Director: {director}</strong></p>
          <p className="movie-card__starring"><strong>Starring:
            {starring.slice(0, 4).join(`, `)}
          </strong></p>
        </div>
      }

      {activeTab === TabsType.DETAIL &&
        <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {starring.join(`,`)}
              </span>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{parseDuration(runtime)}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{date}</span>
            </p>
          </div>
        </div>
      }




      {activeTab === TabsType.REVIEWS &&
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {comments
              .filter((comment, i) => i % 2 === 0)
              .map((comment) =>
              <div key={comment.id} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{comment.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{comment.user.name}</cite>
                    <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{comment.rating}</div>
              </div>
            )}


          </div>
          <div className="movie-card__reviews-col">
            {comments
              .filter((comment, i) => i % 2 !== 0)
              .map((comment) =>
              <div key={comment.id} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{comment.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{comment.user.name}</cite>
                    <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{comment.rating}</div>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
};

Tabs.propTypes = {
  movie: PropTypes.shape({
    genre: PropTypes.string,
    date: PropTypes.string.isRequired,
    descriptions: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    runtime: PropTypes.number.isRequired,
    rating: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
  }),
  activeTab: PropTypes.string.isRequired,
  onClickTab: PropTypes.func.isRequired,
};

export default withActiveTab(Tabs);
