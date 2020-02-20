import React from "react";
import renderer from "react-test-renderer";
import Main from "../main/main.jsx";
import {promoMovie, movies} from "../../utils/test.utils.js";

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      promoMovie={promoMovie}
      movies={movies}
      onMovieCardClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
