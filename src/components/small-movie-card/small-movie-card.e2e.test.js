import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";
import {movie} from "../../utils/test.utils.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should title small card be pressed`, () => {
  const onMovieCardClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCardComponent = shallow(
      <SmallMovieCard
        movie={movie}
        isPlaying={false}
        onMovieCardClick={onMovieCardClick}
        onCardHover={onCardHover}
      />
  );

  const title = smallMovieCardComponent.find(`a.small-movie-card__link`);

  title.simulate(`click`, {preventDefault() {}});
  expect(onMovieCardClick.mock.calls.length).toBe(1);
});

it(`Should poster small card be pressed`, () => {
  const onMovieCardClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCardComponent = shallow(
      <SmallMovieCard
        movie={movie}
        isPlaying={false}
        onMovieCardClick={onMovieCardClick}
        onCardHover={onCardHover}
      />
  );

  const poster = smallMovieCardComponent.find(`div.small-movie-card__image`);

  poster.simulate(`click`, {preventDefault() {}});
  expect(onMovieCardClick.mock.calls.length).toBe(1);
});


it(`Should card be hover`, () => {
  const onMovieCardClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCardComponent = shallow(
      <SmallMovieCard
        movie={movie}
        isPlaying={false}
        onMovieCardClick={onMovieCardClick}
        onCardHover={onCardHover}
      />
  );

  const card = smallMovieCardComponent.find(`article.small-movie-card`);
  card.simulate(`mouseover`);

  expect(onCardHover).toHaveBeenCalledWith(1);
});

it(`Should card be unhover`, () => {
  const onMovieCardClick = jest.fn();
  const onCardHover = jest.fn();

  const smallMovieCardComponent = shallow(
      <SmallMovieCard
        movie={movie}
        isPlaying={false}
        onMovieCardClick={onMovieCardClick}
        onCardHover={onCardHover}
      />
  );

  const card = smallMovieCardComponent.find(`article.small-movie-card`);
  card.simulate(`mouseout`);

  expect(onCardHover).toHaveBeenCalledWith(-1);
});
