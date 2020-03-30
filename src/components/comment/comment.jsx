import React from "react";
import PropTypes from "prop-types";

const Comment = (props) => {
  const {comment: {userName, comment, rating}} = props;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{userName}</cite>
          <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    userName: PropTypes.string,
    comment: PropTypes.string,
    // date: PropTypes.string,
    rating: PropTypes.string,
  }),
};

export default Comment;
