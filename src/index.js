import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {generateMovies} from "./mocks/movies.js";

const movies = generateMovies();

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: `2014`
};

ReactDOM.render(
    <App
      promoMovie={promoMovie}
      movies={movies}
    />,
    document.querySelector(`#root`)
);

