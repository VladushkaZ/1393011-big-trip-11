import AbstractComponent from "./abstract-component.js";

const createPointsConteinerTemplate = () => {

  return (
    `
    <ul class="trip-events__list">

      
    </ul>
    `
  );
};

export default class PointsConteiner extends AbstractComponent {

  getTemplate() {
    return createPointsConteinerTemplate();
  }

}

