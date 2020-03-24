export const getGenres = (movies) => {
  const genres = new Set();

  movies.forEach((movie) => genres.add(movie.genre));
  return Array.from(genres);
};
