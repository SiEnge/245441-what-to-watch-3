import React, {PureComponent} from "react";
// import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
// import {connect} from "react-redux";

import Main from "../main/main.jsx";
// import MoviesList from "../movies-list/movies-list.jsx";
// import MovieCard from "../movie-card/movie-card.jsx";

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
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    return (
      <Main
        onMovieCardClick={this._handleMovieCardClick}
      />
    );
  }
}


export default App;
