import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MovieCard from "../movie-card/movie-card.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      movieCard: null
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(movieId, evt) {
    evt.preventDefault();
    const index = this.props.movies.findIndex((movie) => movie.id === movieId);

    if (index === -1) {
      return;
    }
    this.setState({
      movieCard: this.props.movies[index],
    });
  }

  render() {
    const {movies} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MovieCard
              promoMovie={movies[0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {promoMovie, movies} = this.props;

    if (this.state.movieCard === null) {
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
        promoMovie={this.state.movieCard}
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
