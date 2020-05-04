import SiteMenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import PointsComponent from "./components/points.js";
// import PointsConteinerComponent from "./components/points-conteiner.js";
import DateConteinerComponent from "./components/date-conteiner.js";
import EditFormComponent from "./components/edit-form.js";
import SorterComponent from "./components/sorter.js";
import {generatePoints} from "./mock/points.js";
import DateComponent from "./components/date.js";
import {render, RenderPosition} from "./utils.js";

const POINT_NUM = 22;
const siteMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
const siteEventElement = document.querySelector(`.trip-events`);
const renderPoint = (pointListElement, point) => {
  const onEditButtonClick = () => {
    pointListElement.replaceChild(editFormComponent.getElement(), pointsComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    pointListElement.replaceChild(pointsComponent.getElement(), editFormComponent.getElement());
  };

  const pointsComponent = new PointsComponent(point);
  const editButton = pointsComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const editFormComponent = new EditFormComponent(point);
  const editForm = editFormComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(pointListElement, pointsComponent.getElement(), RenderPosition.BEFOREEND);
};


const renderConteiner = (dateConteinerComponent, points) => {
  render(dateConteinerComponent.getElement(), new SorterComponent().getElement(), RenderPosition.BEFOREEND);
  render(dateConteinerComponent.getElement(), new DateComponent(points).getElement(), RenderPosition.BEFOREEND);
  render(dateConteinerComponent.getElement(), new PointsComponent(points).getElement(), RenderPosition.BEFOREEND);


  const pointListElement = dateConteinerComponent.getElement().querySelector(`.trip-events__list`);
  points.slice(0, POINT_NUM)
    .forEach((point) => {
      renderPoint(pointListElement, point);
    });
};
const points = generatePoints(POINT_NUM);


render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const conteinerComponent = new DateConteinerComponent();
render(siteEventElement, conteinerComponent.getElement(), RenderPosition.BEFOREEND);
renderConteiner(conteinerComponent, points);
