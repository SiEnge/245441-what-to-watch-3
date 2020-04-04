import React from "react";
import renderer from "react-test-renderer";
import Player from "../player/player.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {movie, movies} from "../../utils/test.utils.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    activeMovieId: 1,
    movies,
    movie,
  }
});

it(`Render Player`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <Player
            movie={movie}
            onPlayButtonClick={() => {}}
            onExitButtonClick={() => {}}
            onFullscreenButtonClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
