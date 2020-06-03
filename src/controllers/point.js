import PointsComponent from "../components/points.js";
import EditFormComponent from "../components/edit-form.js";
import {render, replace, RenderPosition} from "../utils/render.js";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._pointsComponent = null;
    this._EditFormComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point) {

    this._pointsComponent = new PointsComponent(point);
    this._editFormComponent = new EditFormComponent(point);

    this._pointsComponent.setEditButtonClickHandler(() => {
      this._replacePointToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editFormComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, point, Object.assign({}, point, {
        isFavorite: !point.isFavorite,
      }));
    });


    this._editFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToPoint();
    });

    render(this._container, this._pointsComponent, RenderPosition.BEFOREEND);
  }
  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._pointsComponent, this._editFormComponent);
  }

  _replacePointToEdit() {
    replace(this._editFormComponent, this._pointsComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }

  }
}
