import React from "react";
import PropTypes from "prop-types";
import {AppRoute} from "../../const.js";
import {Link} from "react-router-dom";

const Logo = (props) => {
  const {classLink} = props;

  return (
    <div className="logo">
      <Link to={AppRoute.ROOT} className={classLink}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  classLink: PropTypes.string,
};

export default Logo;
