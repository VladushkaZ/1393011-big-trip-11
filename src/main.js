import {createSiteMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createPointsTemplate} from "./components/points.js";
import {createEditFormTemplate} from "./components/edit-form.js";
import {createCostTemplate} from "./components/cost.js";
import {createDistTemplate} from "./components/distance.js";
import {createSorterTemplate} from "./components/sorter.js";


const render = (container, template, place = `beforeend`) =>{
  container.insertAdjacentHTML(place, template);
};
const siteMainElement = document.querySelector(`.trip-main`);
render(siteMainElement, createDistTemplate(), `afterbegin`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-controls`);
render(siteHeaderElement, createCostTemplate(), `beforebegin`);
render(siteHeaderElement, createSiteMenuTemplate());
render(siteHeaderElement, createFilterTemplate());
const siteEventElement = document.querySelector(`.trip-events`);
render(siteEventElement, createSorterTemplate());
render(siteEventElement, createEditFormTemplate());
const POINT_NUM = 3;
for (let i = 0; i < POINT_NUM; i++) {
  render(siteEventElement, createPointsTemplate());
}

