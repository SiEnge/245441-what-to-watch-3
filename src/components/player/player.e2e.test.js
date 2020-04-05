import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Router} from "react-router-dom";
import history from "../../history.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import Player from "./player.jsx";
import {movie, movies} from "../../utils/test.utils.js";

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.DATA]: {
    activeMovieId: 1,
    movie,
    movies,
  }
});

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call handler on exit button click`, () => {
  const onExitButtonClick = jest.fn();
  const onPlayButtonClick = jest.fn();
  const onFullscreenButtonClick = jest.fn();

  const playerComponent = mount(
      <Provider store={store}>
        <Router history={history}>
          <Player
            movie={movie}
            onExitButtonClick={onExitButtonClick}
            onPlayButtonClick={onPlayButtonClick}
            onFullscreenButtonClick={onFullscreenButtonClick}
          />
        </Router>
      </Provider>
  );

  const exitButton = playerComponent.find(`button.player__exit`);

  exitButton.simulate(`click`);
  expect(onExitButtonClick.mock.calls.length).toBe(1);
});
