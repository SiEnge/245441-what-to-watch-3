import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";
import {movie} from "../../utils/test.utils.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card be hover`, () => {
  const onTitleClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        movie={movie}
        onTitleClick={onTitleClick}
        onCardHover={onCardHover}
      />
  );

  const card = smallMovieCard.find(`article.small-movie-card`);
  card.simulate(`mouseover`);

  expect(onCardHover).toHaveBeenCalledWith(`1`);
});

it(`Should card be unhover`, () => {
  const onTitleClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        movie={movie}
        onTitleClick={onTitleClick}
        onCardHover={onCardHover}
      />
  );

  const card = smallMovieCard.find(`article.small-movie-card`);
  card.simulate(`mouseout`);

  expect(onCardHover).toHaveBeenCalledWith(-1);
});

it(`Should title card be pressed`, () => {
  const onTitleClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCard = shallow(
      <SmallMovieCard
        movie={movie}
        onTitleClick={onTitleClick}
        onCardHover={onCardHover}
      />
  );

  const title = smallMovieCard.find(`a.small-movie-card__link`);

  title.props().onClick();
  expect(onTitleClick.mock.calls.length).toBe(1);
});

