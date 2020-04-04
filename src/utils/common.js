import {MINUTE_IN_ONE_HOUR, TEN_MINUTES, ScoreType} from "../const.js";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getScoreType = (score) => {
  let scoreName;

  if (score >= 0 && score < 3) {
    scoreName = ScoreType.BAD;
  } else if (score >= 3 && score < 5) {
    scoreName = ScoreType.NORMAL;
  } else if (score >= 5 && score < 8) {
    scoreName = ScoreType.GOOD;
  } else if (score >= 8 && score < 10) {
    scoreName = ScoreType.VERY_GOOD;
  } else if (score >= 10) {
    scoreName = ScoreType.AWESOME;
  }

  return scoreName;
};

export const parseDuration = (duration) => {
  if (duration > MINUTE_IN_ONE_HOUR) {
    const hour = Math.floor(duration / MINUTE_IN_ONE_HOUR);
    const minute = (duration % MINUTE_IN_ONE_HOUR < TEN_MINUTES) ? `0${duration % MINUTE_IN_ONE_HOUR}` : duration % MINUTE_IN_ONE_HOUR;
    return `${hour}h ${minute}m`;
  }

  return `${duration}m`;
};

export const parseTime = (duration) => {
  let hour = `00`;
  let minut = `00`;
  let second = `00`;

  if (+duration < 60 && +duration !== 0) {
    second = duration;
  } else {
    minut = String(Math.floor(+duration / 60));
    second = String(+duration - (+minut * 60));
  }

  if (+minut > 60) {
    hour = String(Math.floor(+minut / 60));
    minut = String(+minut - (+hour * 60));
  }

  if (hour.length === 1) {
    hour = `0${hour}`;
  }

  if (minut.length === 1) {
    minut = `0${minut}`;
  }

  if (second.length === 1) {
    second = `0${second}`;
  }

  return `${hour}:${minut}:${second}`;
};
