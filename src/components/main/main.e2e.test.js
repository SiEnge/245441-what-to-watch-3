import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import {promoMovie, movies} from "../../utils/test.utils.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should title be pressed`, () => {
  const onMovieCardClick = jest.fn();

  const main = shallow(
      <Main
        promoMovie={promoMovie}
        movies={movies}
        onMovieCardClick={onMovieCardClick}
      />
  );

  const titles = main.find(`a.small-movie-card__link`);

  titles.forEach((title) => {
    title.props().onClick();
  });

  expect(onMovieCardClick.mock.calls.length).toBe(titles.length);
});
