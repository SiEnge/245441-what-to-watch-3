const GenreType = {
  ALL_GENRES: `All genres`,
  COMEDIAS: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMAS: `Dramas`,
  HORROR: `Horror`,
  KIDS_FAMILY: `Kids & Family`,
  ROMANCE: `Romance`,
  SCI_FI: `Sci-Fi`,
  THRILLERS: `Thrillers`,
};

export const getGenreMovies = (movies, genreType) => {
  return movies.filter((movie) => movie.genre === genreType);
};

export const getGenres = (movies) => {
  const genres = new Set();

  movies.forEach((movie) => genres.add(movie.genre));
  return Array.from(genres);
};
