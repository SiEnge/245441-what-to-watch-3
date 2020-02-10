import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const App = ({promoMovie, movies}) => {
  return (
    <Main
      promoMovie={promoMovie}
      movies={movies}
    />
  );
};

App.propTypes = {
  promoMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }),

  movies: PropTypes.arrayOf(PropTypes.string.isRequired)
};

export default App;
