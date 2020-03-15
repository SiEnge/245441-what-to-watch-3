const SMALL_MOVIE_CARD_COUNT = 8;

const movieTitles = [
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`,
  `We need to talk about Kevin`,
  `What We Do in the Shadows`,
  `Revenant`,
  `Johnny English`,
  `Shutter Island`,
  `Pulp Fiction`,
  `No Country for Old Men`,
  `Snatch`,
  `Moonrise Kingdom`,
  `Seven Years in Tibet`,
  `Midnight Special`,
  `War of the Worlds`,
  `Dardjeeling Limited`,
  `Orlando`,
  `Mindhunter`,
];

const moviePreviews = [
  `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
];

const movieGenres = [
  `Comedy`,
  `Crime`,
  `Documentary`,
  `Drama`,
  `Horror`,
  `Sci-Fi`,
  `Thriller`,
];

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const generateMovie = (index) => {
  const title = getRandomArrayItem(movieTitles);
  const poster = title.toLowerCase().replace(/\s/g, `-`);

  return {
    id: `${index}_${title}`,
    title: getRandomArrayItem(movieTitles),
    poster: `img/${poster}.jpg`,
    preview: moviePreviews[index % 2],
    genre: getRandomArrayItem(movieGenres),
    date: `2014`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    descriptions: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    ],
    score: 6.6,
    rating: `240`,
    runtime: getRandomIntegerNumber(66, 240),
    director: `Wes Andreson`,
    starring: [
      `Bill Murray`,
      `Edward Norton`,
      `Jude Law`,
      `Willem Dafoe`,
      `Saoirse Ronan`,
      `Tony Revoloru`,
      `Tilda Swinton`,
      `Tom Wilkinson`,
      `Owen Wilkinson`,
      `Adrien Brody`,
      `Ralph Fiennes`,
      `Jeff Goldblum`
    ],
  };
};

export const generateMovies = () => {
  return new Array(SMALL_MOVIE_CARD_COUNT)
    .fill(``)
    .map((it, index) => generateMovie(index));
};

export const movies = generateMovies();
