import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {movies, movie, genres, promoMovieServer} from "../../utils/test.utils.js";
import {noop} from "../../const.js";

const api = createAPI(noop);

it(`Reducer Data without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    movies: [],
    promoMovie: {},
    activeMovieId: -1,
    genres: [],
  });
});


it(`Reducer Data should update movies by load movies`, () => {
  expect(reducer({
    movies: [],
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  })).toEqual({
    movies,
  });
});

it(`Reducer Data should update movies by update movies`, () => {
  expect(reducer({
    movies: [movie],
  }, {
    type: ActionType.UPDATE_MOVIES,
    payload: movie,
  })).toEqual({
    movies: [movie],
  });
});

it(`Reducer Data should update promo movie by load promo movie`, () => {
  expect(reducer({
    promoMovie: [],
  }, {
    type: ActionType.LOAD_PROMO_MOVIE,
    payload: movie,
  })).toEqual({
    promoMovie: movie,
  });
});

it(`Reducer Data should update genres by load genres`, () => {
  expect(reducer({
    genres: [],
  }, {
    type: ActionType.GET_GENRES,
    payload: genres,
  })).toEqual({
    genres,
  });
});

it(`Reducer Data should set active movie id by load active movie id`, () => {
  expect(reducer({
    activeMovieId: -1,
  }, {
    type: ActionType.SET_ACTIVE_MOVIE_ID,
    payload: 1,
  })).toEqual({
    activeMovieId: 1,
  });

  expect(reducer({
    activeMovieId: 10,
  }, {
    type: ActionType.SET_ACTIVE_MOVIE_ID,
    payload: 1,
  })).toEqual({
    activeMovieId: 1,
  });
});


describe(`Operation Data work correctly`, () => {
  it(`Should make a correct API call to get/films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadMovies = Operation.loadMovies();

    apiMock.onGet(`/films`).reply(200, []);

    return loadMovies(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: []
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.GET_GENRES,
          payload: []
        });
      });
  });

  it(`Should make a correct API call to get/films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadPromoMovies = Operation.loadPromoMovies();

    apiMock.onGet(`/films/promo`).reply(200, promoMovieServer);

    return loadPromoMovies(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: movie,
        });
      });
  });

  it(`Should make a correct API call to post/favorite/:id/:status`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const setStatusFavoriteMovie = Operation.setStatusFavoriteMovie({
      movieId: 1,
      isFavorite: true,
      isPromo: true,
    });

    apiMock.onPost(`/favorite/1/1`).reply(200, promoMovieServer);

    return setStatusFavoriteMovie(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: movie,
        });
      });
  });

  it(`Should make a correct API call to post/favorite/:id/:status`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const setStatusFavoriteMovie = Operation.setStatusFavoriteMovie({
      movieId: 1,
      isFavorite: false,
      isPromo: true,
    });

    apiMock.onPost(`/favorite/1/0`).reply(200, promoMovieServer);

    return setStatusFavoriteMovie(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: movie,
        });
      });
  });

  it(`Should make a correct API call to post/favorite/:id/:status`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const setStatusFavoriteMovie = Operation.setStatusFavoriteMovie({
      movieId: 1,
      isFavorite: true,
      isPromo: false,
    });

    apiMock.onPost(`/favorite/1/1`).reply(200, promoMovieServer);

    return setStatusFavoriteMovie(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_MOVIES,
          payload: movie,
        });
      });
  });

  it(`Should make a correct API call to post/favorite/:id/:status`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const setStatusFavoriteMovie = Operation.setStatusFavoriteMovie({
      movieId: 1,
      isFavorite: false,
      isPromo: false,
    });

    apiMock.onPost(`/favorite/1/0`).reply(200, promoMovieServer);

    return setStatusFavoriteMovie(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_MOVIES,
          payload: movie,
        });
      });
  });
});
