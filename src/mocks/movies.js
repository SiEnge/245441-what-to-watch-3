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

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const generateMovie = () => {
  const title = getRandomArrayItem(movieTitles);
  const poster = title.toLowerCase().replace(/\s/g, `-`);

  return {
    id: String(new Date() + Math.random()),
    title,
    poster: `img/${poster}.jpg`,
  };
};

export const generateMovies = () => {
  return new Array(SMALL_MOVIE_CARD_COUNT)
    .fill(``)
    .map(generateMovie);
};

export const movies = generateMovies();
