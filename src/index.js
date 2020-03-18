import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {reducer} from "./reducer.js";

const promoMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: `2014`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  descriptions: [
    `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  ],
  score: 6.6,
  rating: `240`,
  director: `Wes Andreson`,
  starring: `Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other`,
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const genres = [];

ReactDOM.render(
    <Provider store={store}>
      <App
        promoMovie={promoMovie}
      />
    </Provider>,
    document.querySelector(`#root`)
);
