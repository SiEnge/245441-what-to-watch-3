import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Genres from "./genres.jsx";
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

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call handler on genre click`, () => {
  const onGenresClick = jest.fn();

  const genresComponent = mount(
      <Provider store={store}>
        <Genres
          genres={genres}
          activeGenre={activeGenre}
          onGenresClick={onGenresClick}
        />
      </Provider>
  );

  const genre = genresComponent.find(`a.catalog__genres-link`).first();

  genre.simulate(`click`, {
    preventDefault: onGenresClick,
  });

  expect(onGenresClick.mock.calls.length).toBe(1);
});
