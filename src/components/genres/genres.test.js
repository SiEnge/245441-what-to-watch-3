import React from "react";
import renderer from "react-test-renderer";
import Genres from "./genres.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {genres, activeGenre} from "../../utils/test.utils.js";
import {noop} from "../../const.js";

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
  const tree = renderer
    .create(
        <Provider store={store}>
          <Genres
            genres={genres}
            activeGenre={activeGenre}
            onGenresClick={noop}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
