import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import {getPromoMovie, getActiveMovie} from "../../reducer/data/selectors.js";
import {connect} from "react-redux";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";
import {Link} from "react-router-dom";

const MovieCard = (props) => {
  // debugger;
  const {movie, movie: {id, title, genre, date, poster, background}, authStatus} = props;

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

              {authStatus === AuthorizationStatus.AUTH &&
                <Link to={`${AppRoute.FILMS}/${id}${AppRoute.REVIEW}`}
                  className="btn movie-card__button">Add review
                </Link>
              }

            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={poster} alt="{title} poster" width="218" height="327" />
          </div>

        </div>
      </div>
    </section>


  );
};

          // <Tabs movie={movie}/>


MovieCard.propTypes = {
  movie: PropTypes.shape({
    // title: PropTypes.string.isRequired,
    // genre: PropTypes.string,
    // date: PropTypes.string.isRequired,
    // poster: PropTypes.string.isRequired,
    // background: PropTypes.string.isRequired,
  }),
};


const mapStateToProps = (state) => ({
  // movie: getPromoMovie(state),
  movie: getActiveMovie(state),
  authStatus: getAuthStatus(state),
});

// const mapDispatchToProps = ({onShowMoreButtonClick: ActionCreator.incrementPage});

export {MovieCard};
export default connect(mapStateToProps)(MovieCard);
