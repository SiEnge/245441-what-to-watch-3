import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const titleHandler = () => {};

const App = ({promoMovie, movies}) => {
  return (
    <Main
      promoMovie={promoMovie}
      movies={movies}
      onTitleClick={titleHandler}
    />
  );
};

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
