import AbstractComponent from "./abstract-component.js";
// import {MONTH_NAMES} from "../const.js";
// import {formatDate} from "../utils.js";

const createDateTemplate = (point) => {
  const {startDateTime} = point;
  // const startDate = `${MONTH_NAMES[new Date(startDateTime).getMonth() + 1]} ${new Date(startDateTime).getDate()}`;
  const startDate = new Date(startDateTime);
  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
    <span class="day__counter">1</span>
    <time class="day__date" datetime="">${startDate}</time>
    </div>
    <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class Date extends AbstractComponent {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createDateTemplate(this._point);
  }

}


