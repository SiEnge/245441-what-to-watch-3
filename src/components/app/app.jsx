import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import MovieCard from "../movie-card/movie-card.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      movieCardId: -1
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(movieId) {
    this.setState({
      movieCardId: movieId,
    });
  }

  render() {


    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-route">
            {this._renderMovieCard()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderMovieCard() {
    const {movies} = this.props;
    const {movieCardId} = this.state;

    return (
      <React.Fragment>
        <MovieCard
          movie={movies[movies.findIndex((movie) => movie.id === movieCardId)] || movies[0]}
        />
        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MoviesList
              movies={movies.slice(0, 4)}
              onMovieCardClick={this._handleMovieCardClick}

            />
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
    );
  }

  _renderApp() {
    const {promoMovie, movies} = this.props;
    const {movieCardId} = this.state;

    if (movieCardId === -1) {
      return (
        <Main
          promoMovie={promoMovie}
          movies={movies}
          onMovieCardClick={this._handleMovieCardClick}
        />
      );
    }

    return this._renderMovieCard();
  }
}

App.propTypes = {
  promoMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }),

  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      })
  ).isRequired,
};

export default App;
