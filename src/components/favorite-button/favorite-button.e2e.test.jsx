import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FavoriteButton from "./favorite-button.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call handler on favorite button click`, () => {
  const onFavoriteButtonClick = jest.fn();

  const favoriteButtonComponent = shallow(
      <FavoriteButton
        movieId={1}
        isFavorite={false}
        onFavoriteButtonClick={onFavoriteButtonClick}
      />
  );

  favoriteButtonComponent.simulate(`click`);

  expect(onFavoriteButtonClick.mock.calls.length).toBe(1);
});
