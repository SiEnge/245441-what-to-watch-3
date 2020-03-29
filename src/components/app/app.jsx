import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoute from "../private-route/private-route.jsx";
import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";

import {Operation} from "../../reducer/user/user.js";
import {Operation as CommentOperation} from "../../reducer/comment/comment.js";
import {ActionCreator} from "../../reducer/data/data.js";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

// import MoviesList from "../movies-list/movies-list.jsx";
import MyList from "../my-list/my-list.jsx";
import MovieCard from "../movie-card/movie-card.jsx";
import Player from "../player/player.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(movieId) {
    this.props.setActiveMovieId(movieId);
    this.props.getComments(movieId);

    history.push(`${AppRoute.FILMS}/${movieId}`)
  }

  render() {
    const {authStatus, authorization, addComment} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main
              onMovieCardClick={this._handleMovieCardClick}
            />
          </Route>

          <Route exact path={AppRoute.LOGIN}>
            <SignIn
              onSubmit={authorization}
            />
          </Route>

          <PrivateRoute exact path={AppRoute.MY_LIST}
            render={() => {
              return (
                <MyList />
              );
            }}
          />

          <Route exact path={`${AppRoute.FILMS}/:id`}>
            <MovieCard />
          </Route>

          <PrivateRoute exact path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
            render={() => {
              return (
                <AddReview
                  onSubmit={addComment}
                />
              );
            }}
          />

          <Route exact path={`${AppRoute.FILMS}/:id${AppRoute.PLAYER}`}>
            <Player />
          </Route>

        </Switch>
      </Router>
    );
  }

}

App.propTypes = {
  authorization: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  // addComment: addComment.func.isRequired
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = ({
  authorization: Operation.authorization,
  addComment: CommentOperation.addComment,
  getComments: CommentOperation.getComments,
  setActiveMovieId: ActionCreator.setActiveMovieId,
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);


