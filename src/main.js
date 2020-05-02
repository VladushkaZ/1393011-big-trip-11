import {createSiteMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createPointsTemplate} from "./components/points.js";
// import {createPointsConteinerTemplate} from "./components/date-conteiner.js";
import {createDateConteinerTemplate} from "./components/date-conteiner.js";
import {createEditFormTemplate} from "./components/edit-form.js";
import {createCostTemplate} from "./components/cost.js";
import {createDistTemplate} from "./components/distance.js";
import {createSorterTemplate} from "./components/sorter.js";
import {generatePoints} from "./mock/points.js";
import {createDateTemplate} from "./components/date.js";

const render = (container, template, place = `beforeend`) =>{
  container.insertAdjacentHTML(place, template);
};
const POINT_NUM = 22;
const points = generatePoints(POINT_NUM);
const siteMainElement = document.querySelector(`.trip-main`);
render(siteMainElement, createDistTemplate(), `afterbegin`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-controls`);
render(siteHeaderElement, createCostTemplate(), `beforebegin`);
render(siteHeaderElement, createSiteMenuTemplate());
render(siteHeaderElement, createFilterTemplate());
const siteEventElement = document.querySelector(`.trip-events`);
render(siteEventElement, createSorterTemplate());
render(siteEventElement, createEditFormTemplate(points[0]));

const allDates = [];
for (let i = 1; i < POINT_NUM; i++) {
  allDates.push(new Date(points[i].startDateTime));
}
const tripDates = () => {
  const tripDays = [];
  allDates.forEach((date) => {
    if (tripDays.indexOf(date) === -1) {
      tripDays.push(date);
    }
  });
};

for (let i = 1; i < POINT_NUM; i++) {
  render(siteEventElement, createDateTemplate(points[i]));
  const conteinerPoints = points.filter((point) => point.startDateTime === tripDates[i]);
  render(siteEventElement, createDateConteinerTemplate(points[i]));
  points.slice(i, conteinerPoints.length);
  // .forEach((point) =>
  render(siteEventElement, createPointsTemplate(points[i]));
}


