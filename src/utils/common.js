

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const castDateFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatDate = (date) => {
  const year = castDateFormat(date.getFullYear().toString().substr(-2));
  const month = castDateFormat(date.getMonth() + 1);
  const day = castDateFormat(date.getDate());

  return `${year}/${month}/${day}`;
};
