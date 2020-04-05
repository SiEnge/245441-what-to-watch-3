import React from "react";
import PropTypes from "prop-types";
import {withActiveTab} from "../../hocs/witn-active-tab/witn-active-tab.jsx";
import Comment from "../comment/comment.jsx";
import {TabsType} from "../../const.js";
import {getScoreType, parseDuration} from "../../utils/common.js";

const MAX_COUNT_STARRING = 4;

const Tabs = (props) => {
  const {movie: {genre, date, descriptions, score, rating, runtime, director, starrings}, activeTab, comments} = props;
  const starringText = `${starrings.slice(0, MAX_COUNT_STARRING).join(`, `)} ${starrings.length > MAX_COUNT_STARRING ? ` and other` : ``}`;

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
          <div className="movie-rating__score">{rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">{getScoreType(rating)}</span>
            <span className="movie-rating__count">{score} ratings</span>
          </p>
        </div>
      }

      {activeTab === TabsType.OVERVIEW &&
        <div className="movie-card__text">
          {descriptions.map((description, i) =>
            <p key={i}>{description}</p>
          )}
          <p className="movie-card__director"><strong>Director: {director}</strong></p>
          <p className="movie-card__starring"><strong>Starring: {starringText}</strong></p>
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
              <span className="movie-card__details-value" dangerouslySetInnerHTML={{__html: starrings.join(`,<br>`)}} />
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
              .map((comment) => <Comment key={comment.id} comment={comment} />)
            }
          </div>
          <div className="movie-card__reviews-col">
            {comments
              .filter((comment, i) => i % 2 !== 0)
              .map((comment) => <Comment key={comment.id} comment={comment} />)
            }
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
    descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    score: PropTypes.number.isRequired,
    runtime: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starrings: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),

  comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        userName: PropTypes.string,
        rating: PropTypes.number,
        comment: PropTypes.string,
        date: PropTypes.string,
      })
  ),

  activeTab: PropTypes.string.isRequired,

  onClickTab: PropTypes.func.isRequired,
};

export default withActiveTab(Tabs);
