import React from "react";
import renderer from "react-test-renderer";
import FavoriteButton from "./favorite-button.jsx";
import {noop} from "../../const.js";

it(`Render FavoriteButton isFavorite = false`, () => {
  const tree = renderer
    .create(<FavoriteButton
      movieId={1}
      isFavorite={false}
      onFavoriteButtonClick={noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render FavoriteButton isFavorite = true`, () => {
  const tree = renderer
    .create(<FavoriteButton
      movieId={1}
      isFavorite={true}
      onFavoriteButtonClick={noop}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

