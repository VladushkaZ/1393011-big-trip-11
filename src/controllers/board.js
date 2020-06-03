
import SorterComponent from "../components/sorter.js";
import NoPointsComponent from "../components/no-points.js";
import PointsComponent from "../components/points.js";
import DateComponent from "../components/date.js";
import {SortType} from "../components/sorter.js";
import {render, RenderPosition} from "../utils/render.js";
import PointController from "./point.js";

const POINT_NUM = 4;

const renderPoints = (pointListElement, points, onDataChange) => {
  return points.map((point) => {
    const pointController = new PointController(pointListElement, onDataChange);

    pointController.render(point);

    return pointController;
  });
};

const getSortedPoints = (points, sortType, from, to) => {
  let sortedPoints = [];
  const showingPoints = points.slice();

  switch (sortType) {
    case SortType.EVENT:
      sortedPoints = showingPoints.sort((a, b) => a.type - b.type);
      break;
    case SortType.TIME:
      sortedPoints = showingPoints.sort((a, b) => b.duration - a.duration);
      break;
    case SortType.PRICE:
      sortedPoints = showingPoints.sort((a, b) => b.price - a.price);
      break;
  }

  return sortedPoints.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._points = [];
    this._showedPointControllers = [];
    this._showingPointsCount = POINT_NUM;
    this._noPointsComponent = new NoPointsComponent();
    this._pointsComponent = new PointsComponent();
    this._sorterComponent = new SorterComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sorterComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(points) {
    this._points = points;
    const container = this._container.getElement();

    const isAllPointsArchived = this._points.every((point) => point.isArchive);

    if (isAllPointsArchived) {
      render(container, this._noPointsComponent(), RenderPosition.BEFOREEND);
      return;
    }
    render(container, this._sorterComponent, RenderPosition.BEFOREEND);
    render(container, new DateComponent(points), RenderPosition.BEFOREEND);


    const pointListElement = container.querySelector(`.trip-events__list`);
    const newPoints = renderPoints(pointListElement, this._points.slice(0, this._showingPointsCount), this._onDataChange);

    this._showedPointControllers = this._showedPointControllers.concat(newPoints);
  }
  _onDataChange(pointController, oldData, newData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }
    this._points = [].concat(this._points.slice(0, index), newData, this._points.slice(index + 1));
    pointController.render(this._points[index]);
  }

  _onSortTypeChange(sortType) {
    const container = this._container.getElement();
    const sortedPoints = getSortedPoints(this._points, sortType, 0, this._showingTasksCount);
    const pointListElement = container.querySelector(`.trip-events__list`);
    pointListElement.innerHTML = ``;
    const newPoints = renderPoints(pointListElement, sortedPoints, this._onDataChange);
    this._showedPointControllers = newPoints;
  }
}


// Поиск
// const find = (query(запрос), points(где искать)) => {
//  return tasks.filter((it) => it.description(информация - поле поиска).indexOf(query) === 0);
// }
// Поиск по одинаковым параметрам
// const find = (date, points) => {
//  return tasks.filter((it) => it.dueDate.getYear() === date.getYear());
// }

// const allDates = [];
// allDates.push(`${new Date(point.startDateTime).getMonth() + 1}. ${new Date(point.startDateTime).getDate()}`);
// }
// const tripDays = [];
// allDates.forEach((dates) => {
// if (tripDays.indexOf(dates) === -1) {
//  tripDays.push(dates);
// }
// });
