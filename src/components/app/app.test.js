import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {promoMovie, movies} from "../../utils/test.utils.js";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      promoMovie={promoMovie}
      movies={movies}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
