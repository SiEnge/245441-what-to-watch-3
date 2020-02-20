import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "../movie-card/movie-card.jsx";
import {movie} from "../../utils/test.utils.js";

it(`Render MovieCard`, () => {
  const tree = renderer
    .create(<MovieCard
      promoMovie={movie}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
