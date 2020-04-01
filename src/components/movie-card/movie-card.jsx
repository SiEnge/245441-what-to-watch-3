import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import {getActiveMovie, getMovies} from "../../reducer/data/selectors.js";
import {getSimilarByGenre} from "../../utils/genre.js";
import {connect} from "react-redux";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {getComments} from "../../reducer/comment/selectors.js";
import {AuthorizationStatus} from "../../const.js";
import {AppRoute} from "../../const.js";
import {Link} from "react-router-dom";
import MoviesList from "../movies-list/movies-list.jsx";
import UserBlock from "../user-block/user-block.jsx";
import Logo from "../logo/logo.jsx";
import {Operation} from "../../reducer/data/data.js";

const MAX_COUNT_SIMILAR_MOVIES = 4;

const MovieCard = (props) => {
  const {movie, movie: {id, title, genre, date, poster, background, isFavorite}, movies, onMovieCardClick,
    comments, authStatus, setStatusFavoriteMovie} = props;

  const similarMovies = getSimilarByGenre(movies, genre).slice(0, MAX_COUNT_SIMILAR_MOVIES);

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={background} alt="{title}" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Logo classLink={`logo__link`} />

          <UserBlock
            isAuth={authStatus === AuthorizationStatus.AUTH}
          />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{date}</span>
            </p>

            <div className="movie-card__buttons">
              <Link to={`${AppRoute.FILMS}/${id}${AppRoute.PLAYER}`}
                className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </Link>

              <button
                onClick={() => {
                  setStatusFavoriteMovie({movieId: id, status: !isFavorite});
                }}

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

          <Tabs movie={movie} comments={comments}/>

        </div>
      </div>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesList
            movies={similarMovies}
            onMovieCardClick={onMovieCardClick}
          />
        </section>

        <footer className="page-footer">
          <Logo classLink={`logo__link logo__link--light`} />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>

    </section>


  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    genre: PropTypes.string,
    date: PropTypes.string,
    poster: PropTypes.string,
    background: PropTypes.string,
    isFavorite: PropTypes.bool,
  }),

  movies: PropTypes.array,

  comments: PropTypes.array,

  authStatus: PropTypes.string,

  setStatusFavoriteMovie: PropTypes.func.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,

};


const mapStateToProps = (state) => ({
  movie: getActiveMovie(state),
  authStatus: getAuthStatus(state),
  comments: getComments(state),
  movies: getMovies(state),

});

const mapDispatchToProps = ({
  setStatusFavoriteMovie: Operation.setStatusFavoriteMovie,
});


export {MovieCard};
export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
