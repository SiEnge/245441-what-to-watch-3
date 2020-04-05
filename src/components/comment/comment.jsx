import React from "react";
import PropTypes from "prop-types";
import {parseDateComment} from "../../utils/comment.js";

const Comment = (props) => {
  const {comment: {userName, comment, date, rating}} = props;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{userName}</cite>
          <time className="review__date" dateTime={date}>{parseDateComment(date)}</time>
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
    date: PropTypes.date,
    rating: PropTypes.number,
  }),
};

export default Comment;
