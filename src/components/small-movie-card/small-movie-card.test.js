import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";
import {movie} from "../../utils/test.utils.js";
import {noop} from "../../const.js";

it(`Render SmallMovieCard with Playing`, () => {
  const tree = renderer
    .create(
        <SmallMovieCard
          movie={movie}
          isPlaying={true}
          onMovieCardClick={noop}
          onCardHover={noop}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render SmallMovieCard not Playing`, () => {
  const tree = renderer
    .create(
        <SmallMovieCard
          movie={movie}
          isPlaying={false}
          onMovieCardClick={noop}
          onCardHover={noop}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
