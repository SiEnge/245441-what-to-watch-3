import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import MovieCard from "../movie-card/movie-card.jsx";

const titleHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {promoMovie, movies} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main
              promoMovie={promoMovie}
              movies={movies}
              onTitleClick={titleHandler}
            />
          </Route>
          <Route exact path="/dev-film">
            <MovieCard />
          </Route>
        </Switch>
      </BrowserRouter>
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

  onTitleClick: PropTypes.func.isRequired,
};

export default App;
