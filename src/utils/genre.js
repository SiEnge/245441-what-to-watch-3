const MAX_COUNT_GENRES = 9;

export const getGenres = (movies) => {
  const genres = new Set();

  movies.forEach((movie) => genres.add(movie.genre));
  return Array.from(genres).slice(0, MAX_COUNT_GENRES);
};


export const getSimilarByGenre = (movies, genre) => {
  return movies.filter((movie) => movie.genre === genre);
};
