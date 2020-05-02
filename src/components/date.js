import {MONTH_NAMES} from "../const.js";

export const createDateTemplate = (date) => {
  const {startDateTime, dayNum} = date;

  const startDate = ` ${MONTH_NAMES[startDateTime.getMonth()]} ${startDateTime.getDate()}`;

  return (
    `
    <li class="trip-days__item  day">
    <div class="day__info">
    <span class="day__counter">1</span>
    <time class="day__date" datetime="2019-03-18">${startDate}</time>
    </div>
  </li>`
  );
};

