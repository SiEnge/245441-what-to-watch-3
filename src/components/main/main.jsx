import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {connect} from "react-redux";

// import {} from "../../reducer/data/selectors.js";
import {getPromoMovie, getMoviesByGenre} from "../../reducer/data/selectors.js";
import {getPage} from "../../reducer/state/selectors.js";
import {getAuthStatus} from "../../reducer/user/selectors.js";

import {ActionCreator} from "../../reducer/state/state.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {AppRoute} from "../../const.js";

import MoviesList from "../movies-list/movies-list.jsx";
import Genres from "../genres/genres.jsx";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";

const PER_PAGE_MOVIE_COUNT = 8;

const Main = (props) => {
  const {promoMovie, moviesByGenre, page, authStatus, onMovieCardClick, onShowMoreButtonClick} = props;

  const showedMoviesCount = page * PER_PAGE_MOVIE_COUNT;
  const movies = moviesByGenre.slice(0, showedMoviesCount);

  return (<React.Fragment>
    <section className="movie-card">
      <div className="movie-card__bg" style={{backgroundColor: promoMovie.backgroundColor}}>
        <img src={promoMovie.background} alt={promoMovie.title} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <Logo classLink={"logo__link"} />

        <UserBlock
          isAuth={authStatus === AuthorizationStatus.AUTH}
        />
      </header>


      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img src={promoMovie.poster} alt={promoMovie.title} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoMovie.title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoMovie.genre}</span>
              <span className="movie-card__year">{promoMovie.date}</span>
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
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <Genres />

        <MoviesList
          movies={movies}
          onMovieCardClick={onMovieCardClick}
        />

        <div className="catalog__more">
          {moviesByGenre.length > showedMoviesCount &&
            <ShowMoreButton
              onShowMoreButtonClick={onShowMoreButtonClick}
            />
          }
        </div>
      </section>

      <footer className="page-footer">
        <Logo classLink={"logo__link logo__link--light"} />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </React.Fragment>);

};


Main.propTypes = {
  promoMovie: PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    date: PropTypes.string,
    poster: PropTypes.string,
    background: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),

  moviesByGenre: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        poster: PropTypes.string,
      })
  ),

  authStatus: PropTypes.string.isRequired,



  page: PropTypes.number.isRequired,

  onMovieCardClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  moviesByGenre: getMoviesByGenre(state),
  page: getPage(state),
  authStatus: getAuthStatus(state),
  // user: getUser(state),
});

const mapDispatchToProps = ({onShowMoreButtonClick: ActionCreator.incrementPage});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
