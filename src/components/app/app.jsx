import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {Operation} from "../../reducer/user/user.js";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
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
    const {authStatus, authorization} = this.props;

    if (authStatus === AuthorizationStatus.NO_AUTH) {
      return (
        <SignIn
          onSubmit={authorization}
        />
      );
    } else if (authStatus === AuthorizationStatus.AUTH) {
      return (
        <Main
          onMovieCardClick={this._handleMovieCardClick}
        />
      );
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-auth">
            <SignIn
              onSubmit={this.props.authorization}
            />
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

App.propTypes = {
  authorization: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = ({authorization: Operation.authorization});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
