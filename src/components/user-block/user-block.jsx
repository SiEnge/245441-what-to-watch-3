import React from "react";
import PropTypes from "prop-types";
import {AppRoute} from "../../const.js";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getUser} from "../../reducer/user/selectors.js";

const URL = `https://htmlacademy-react-3.appspot.com/`;

const UserBlock = (props) => {
  const {isAuth, user} = props;
  const avatar = `${URL}${user.avatarUrl}` || '';

  return (
    <div className="user-block">
      {isAuth ?
        <div className="user-block__avatar">
          <Link
            to={AppRoute.MY_LIST}
          >
            <img src={avatar} alt="User avatar" width="63" height="63" />
          </Link>
        </div>
        :
        <Link
          to={AppRoute.LOGIN}
          className="user-block__link">Sign in
        </Link>
      }
    </div>
  );
}

UserBlock.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
  }),

  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
});

export {UserBlock};
export default connect(mapStateToProps)(UserBlock);
