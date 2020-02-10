import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: `2014`
};

const movies = [
  `Fantastic Beasts`,
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`,
  `Revenant`,
  `Johnny English`,
  `Snatch`
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      promoMovie={promoMovie}
      movies={movies}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
