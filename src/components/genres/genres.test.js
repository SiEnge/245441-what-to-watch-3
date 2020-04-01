import React from "react";
import renderer from "react-test-renderer";
import Genres from "../genres/genres.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {genres, activeGenre} from "../../utils/test.utils.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    genres,
  },
  [NameSpace.STATE]: {
    activeGenre,
  }
});

it(`Render Genres`, () => {
  const onGenresClick = jest.fn();

  const tree = renderer
    .create(
        <Provider store={store}>
          <Genres
            genres={genres}
            activeGenre={activeGenre}
            onClick={onGenresClick}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
