export const adapterMovie = (movie) => {
  return {
    id: movie.id,
    title: movie.name,
    poster: movie.poster_image,
    // preview: movie.preview_image,
    preview: movie.video_link,
    // previewImage: movie.preview_video_link,
    genre: movie.genre,
    date: String(movie.released),
    background: movie.background_image,
    backgroundColor: movie.background_color, // добавить в пропс и вывод в UI
    descriptions: movie.description, // перевести в массив
    score: movie.scores_count,
    rating: movie.rating,
    runtime: movie.run_time,
    director: movie.director,
    starring: movie.starring,
    isFavorite: movie.is_favorite,
  };
};

export const adapterMovies = (movies) => {
  return movies.map((movie) => adapterMovie(movie));
};

