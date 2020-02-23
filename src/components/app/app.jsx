import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
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
      /* теперь сохраняем в state не все данные по фильму, а только его id */
      movieCardId: movieId,
    });
  }

  render() {
    const {movies} = this.props;
    const {movieCardId} = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-route">
            <MovieCard
              /* отрисовка активного фильма, но пока по умолчанию отрисовка первого фильма */
              movie={movies[movies.findIndex((movie) => movie.id === movieCardId)] || movies[0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  /* этот метод оставила,
  т.к. работу Route и смену адреса в адресной строке при выборе фильма мы еще не проходили :) */
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

    return (
      <MovieCard
        movie={movies[movies.findIndex((movie) => movie.id === movieCardId)]}
      />
    );
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
