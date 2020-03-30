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
import {Operation} from "../../reducer/data/data.js";

import MoviesList from "../movies-list/movies-list.jsx";
import Genres from "../genres/genres.jsx";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";

const PER_PAGE_MOVIE_COUNT = 8;

const Main = (props) => {
  const {promoMovie, moviesByGenre, page, authStatus, onMovieCardClick, onShowMoreButtonClick, setStatusFavoriteMovie} = props;

  const showedMoviesCount = page * PER_PAGE_MOVIE_COUNT;
  const movies = moviesByGenre.slice(0, showedMoviesCount);

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg" style={{backgroundColor: promoMovie.backgroundColor}}>
          <img src={promoMovie.background} alt={promoMovie.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Logo classLink={`logo__link`} />

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

                <Link to={`${AppRoute.FILMS}/${promoMovie.id}${AppRoute.PLAYER}`}
                  className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>

                <button
                  onClick={() => {
                    setStatusFavoriteMovie({movieId: promoMovie.id, status: !promoMovie.isFavorite});
                  }}

                  data-favorite={promoMovie.isFavorite}
                  className="btn btn--list movie-card__button" type="button">
                  {promoMovie.isFavorite ?
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg> :
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                  }
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

          {moviesByGenre.length > showedMoviesCount &&
            <ShowMoreButton
              onShowMoreButtonClick={onShowMoreButtonClick}
            />
          }
        </section>

        <footer className="page-footer">
          <Logo classLink={`logo__link logo__link--light`} />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  promoMovie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    genre: PropTypes.string,
    date: PropTypes.string,
    poster: PropTypes.string,
    background: PropTypes.string,
    backgroundColor: PropTypes.string,
    isFavorite: PropTypes.bool,
  }),

  moviesByGenre: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        poster: PropTypes.string,
      })
  ),

  authStatus: PropTypes.string.isRequired,

  page: PropTypes.number.isRequired,

  onMovieCardClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,

  setStatusFavoriteMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  moviesByGenre: getMoviesByGenre(state),
  page: getPage(state),
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = ({
  onShowMoreButtonClick: ActionCreator.incrementPage,
  setStatusFavoriteMovie: Operation.setStatusFavoriteMovie,
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
