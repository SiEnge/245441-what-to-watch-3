import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "../movies-list/movies-list.jsx";
import {movies} from "../../utils/test.utils.js";

it(`Render MoviesList`, () => {
  const tree = renderer
    .create(
        <MoviesList
          activeSmallCard={1}
          movies={movies}
          onMovieCardClick={() => {}}
          onCardHover={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
