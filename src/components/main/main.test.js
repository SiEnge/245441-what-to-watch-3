import React from "react";
import renderer from "react-test-renderer";
import Main from "../main/main.jsx";
import configureStore from "redux-mock-store";
import {promoMovie, movies} from "../../utils/test.utils.js";
// import NameSpace from "../../reducer/name-space.js";
// import {AuthorizationStatus} from "../../reducer/user/user.js";
// import {MemoryRouter} from "react-router-dom";

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      promoMovie={promoMovie}
      movies={movies}
      onMovieCardClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

