import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {movies} from "../../utils/test.utils.js";
import {noop} from "../../const.js";

it(`Render MoviesList`, () => {
  const tree = renderer
    .create(
        <MoviesList
          activeSmallCard={1}
          movies={movies}
          onMovieCardClick={noop}
          onCardHover={noop}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
