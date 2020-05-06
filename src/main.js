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
import NoPointsComponent from "./components/no-points.js";

const POINT_NUM = 22;
const siteMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
const siteEventElement = document.querySelector(`.trip-events`);
const renderPoint = (pointListElement, point) => {
  const replacePointToEdit = () => {
    pointListElement.replaceChild(editFormComponent.getElement(), pointsComponent.getElement());
  };

  const replaceEditToPoint = () => {
    pointListElement.replaceChild(pointsComponent.getElement(), editFormComponent.getElement());
  };
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const pointsComponent = new PointsComponent(point);
  const editButton = pointsComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editFormComponent = new EditFormComponent(point);
  const editForm = editFormComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointListElement, pointsComponent.getElement(), RenderPosition.BEFOREEND);
};


const renderConteiner = (dateConteinerComponent, points) => {
  const isAllPointsArchived = points.every((point) => point.isArchive);

  if (isAllPointsArchived) {
    render(dateConteinerComponent.getElement(), new NoPointsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(dateConteinerComponent.getElement(), new SorterComponent().getElement(), RenderPosition.BEFOREEND);
  render(dateConteinerComponent.getElement(), new DateComponent(points).getElement(), RenderPosition.BEFOREEND);
  render(dateConteinerComponent.getElement(), new PointsComponent(points).getElement(), RenderPosition.BEFOREEND);

  const pointListElement = dateConteinerComponent.getElement().querySelector(`.trip-events__list`);
  const allDates = [];
  points.slice(0, POINT_NUM)
    .forEach((point) => {   
      renderPoint(pointListElement, point);
      allDates.push(`${new Date(point.startDateTime).getMonth() + 1}. ${new Date(point.startDateTime).getDate()}`);
    });
  const tripDays = [];
  allDates.forEach((dates) => {
    if (tripDays.indexOf(dates) === -1) {
      tripDays.push(dates);
    }
    console.log(tripDays);
  });
  points.slice(0, tripDays.length);
  tripDays.forEach((point) => {
    
    
  });
};

const points = generatePoints(POINT_NUM);


render(siteHeaderElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

const conteinerComponent = new DateConteinerComponent();
render(siteEventElement, conteinerComponent.getElement(), RenderPosition.BEFOREEND);
renderConteiner(conteinerComponent, points);
