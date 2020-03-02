import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import {movie} from "../../utils/test.utils.js";

it(`Render SmallMovieCard`, () => {
  const tree = renderer
    .create(<SmallMovieCard
      key={movie.id}
      movie={movie}
      isPlaying={false}
      onMovieCardClick={() => {}}
      onCardHover={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

