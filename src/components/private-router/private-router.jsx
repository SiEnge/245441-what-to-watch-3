import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRoute} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthStatus} from "../../reducer/user/selectors.js";


const PrivateRoute = (props) => {
  const {render, path, exact, authStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
