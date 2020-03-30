import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoute from "../private-route/private-route.jsx";
import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";

import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as CommentOperation} from "../../reducer/comment/comment.js";
import {ActionCreator} from "../../reducer/data/data.js";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

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

    history.push(`${AppRoute.FILMS}/${movieId}`);
  }

  render() {
    const {authorization, addComment} = this.props;

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
            render={() => (
              <MyList
                onMovieCardClick={this._handleMovieCardClick}
              />
            )}
          />

          <Route exact path={`${AppRoute.FILMS}/:id`}
            render={() => (
              <MovieCard />
            )}
          />

          <PrivateRoute exact path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
            render={() => (
              <AddReview
                onSubmit={addComment}
              />
            )}
          />

          <Route exact path={`${AppRoute.FILMS}/:id${AppRoute.PLAYER}`}
            render={() => (
              <Player />
            )}
          />

        </Switch>
      </Router>
    );
  }

}

App.propTypes = {
  authStatus: PropTypes.string.isRequired,

  authorization: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  setActiveMovieId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = ({
  authorization: UserOperation.authorization,
  addComment: CommentOperation.addComment,
  getComments: CommentOperation.getComments,
  setActiveMovieId: ActionCreator.setActiveMovieId,
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);


