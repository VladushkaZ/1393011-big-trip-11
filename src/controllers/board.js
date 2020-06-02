import PointsComponent from "../components/points.js";
import EditFormComponent from "../components/edit-form.js";
import SorterComponent from "../components/sorter.js";
import NoPointsComponent from "../components/no-points.js";
import DateComponent from "../components/date.js";
import {SortType} from "../components/sorter.js";
import {render, replace, RenderPosition} from "../utils/render.js";

const renderPoint = (pointListElement, point) => {
  const replacePointToEdit = () => {
    replace(editFormComponent, pointsComponent);
  };

  const replaceEditToPoint = () => {
    replace(pointsComponent, editFormComponent);
  };
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const pointsComponent = new PointsComponent(point);
  const pointEditComponent = new EditFormComponent(point);
  pointsComponent.setEditButtonClickHandler(() => {
    replacePointToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const editFormComponent = new EditFormComponent(point);
  pointEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(pointListElement, pointsComponent, RenderPosition.BEFOREEND);
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
    this._noPointsComponent = new NoPointsComponent();
    this._sorterComponent = new SorterComponent();
  }

  render(points) {

    const dateConteinerComponent = this._container;

    const isAllPointsArchived = points.every((point) => point.isArchive);

    if (isAllPointsArchived) {
      render(dateConteinerComponent.getElement(), this._noPointsComponent(), RenderPosition.BEFOREEND);
      return;
    }
    render(dateConteinerComponent.getElement(), this._sorterComponent, RenderPosition.BEFOREEND);
    render(dateConteinerComponent.getElement(), new DateComponent(points), RenderPosition.BEFOREEND);
    const POINT_NUM = 22;
    const pointListElement = dateConteinerComponent.getElement().querySelector(`.trip-events__list`);
    // const allDates = [];
    points.slice(0, POINT_NUM)
      .forEach((point) => {
        renderPoint(pointListElement, point);
        // allDates.push(`${new Date(point.startDateTime).getMonth() + 1}. ${new Date(point.startDateTime).getDate()}`);
      });
    // const tripDays = [];
    // allDates.forEach((dates) => {
    // if (tripDays.indexOf(dates) === -1) {
    //  tripDays.push(dates);
    // }
    // });


    this._sorterComponent.setSortTypeChangeHandler((sortType) => {
      const sortedPoints = getSortedPoints(points, sortType, 0, POINT_NUM);
      pointListElement.innerHTML = ``;
      sortedPoints.slice(0, POINT_NUM)
      .forEach((point) => {
        renderPoint(pointListElement, point);
      });
    });
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
