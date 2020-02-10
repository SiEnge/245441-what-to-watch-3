import React from "react";
import renderer from "react-test-renderer";
import Main from "../main/main.jsx";

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
  `Snatch`
];

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      promoMovie={promoMovie}
      movies={movies}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
