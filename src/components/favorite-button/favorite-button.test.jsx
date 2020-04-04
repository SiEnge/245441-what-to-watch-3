import React from "react";
import renderer from "react-test-renderer";
import FavoriteButton from "./favorite-button.jsx";
// import {comment} from "../../utils/test.utils.js";

it(`Render FavoriteButton isFavorite = false`, () => {
  const onFavoriteButtonClick = jest.fn();

  const tree = renderer
    .create(<FavoriteButton
      movieId={1}
      isFavorite={false}
      onClick={onFavoriteButtonClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render FavoriteButton isFavorite = true`, () => {
  const onFavoriteButtonClick = jest.fn();

  const tree = renderer
    .create(<FavoriteButton
      movieId={1}
      isFavorite={true}
      onClick={onFavoriteButtonClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

