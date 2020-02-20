import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";
import {movie} from "../../utils/test.utils.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card be hover`, () => {
  const onMovieCardClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        movie={movie}
        onMovieCardClick={onMovieCardClick}
        onCardHover={onCardHover}
      />
  );

  const card = smallMovieCard.find(`article.small-movie-card`);
  card.simulate(`mouseover`);

  expect(onCardHover).toHaveBeenCalledWith(`1`);
});

it(`Should card be unhover`, () => {
  const onMovieCardClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        movie={movie}
        onMovieCardClick={onMovieCardClick}
        onCardHover={onCardHover}
      />
  );

  const card = smallMovieCard.find(`article.small-movie-card`);
  card.simulate(`mouseout`);

  expect(onCardHover).toHaveBeenCalledWith(-1);
});

it(`Should title card be pressed`, () => {
  const onMovieCardClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        movie={movie}
        onMovieCardClick={onMovieCardClick}
        onCardHover={onCardHover}
      />
  );

  const title = smallMovieCard.find(`a.small-movie-card__link`);

  title.props().onClick();
  expect(onMovieCardClick.mock.calls.length).toBe(1);
});

it(`Should poster card be pressed`, () => {
  const onMovieCardClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        movie={movie}
        onMovieCardClick={onMovieCardClick}
        onCardHover={onCardHover}
      />
  );

  const poster = smallMovieCard.find(`div.small-movie-card__image`);

  poster.props().onClick();
  expect(onMovieCardClick.mock.calls.length).toBe(1);
});

